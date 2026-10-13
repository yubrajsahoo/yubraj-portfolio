import {describe, it, expect, vi, beforeEach, afterEach} from "vitest";
import {renderHook, act} from "@testing-library/react";
import React from "react";

vi.mock("../../api/v1/services/health", () => ({
    checkHealthAPI: vi.fn(),
}));

import {HealthProvider, useHealth} from "../../contexts/HealthContext";
import {checkHealthAPI} from "../../api/v1/services/health";

describe("HealthContext", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const wrapper = ({children}: {children: React.ReactNode}) => (
        <HealthProvider>{children}</HealthProvider>
    );

    it("checks backend health on mount and sets isBackendUp", async () => {
        vi.mocked(checkHealthAPI).mockResolvedValueOnce(true);

        const {result} = renderHook(() => useHealth(), {wrapper});

        await act(async () => {
            await Promise.resolve();
        });

        expect(checkHealthAPI).toHaveBeenCalledTimes(1);
        expect(result.current.isBackendUp).toBe(true);
        expect(result.current.isInitialLoading).toBe(false);
    });

    it("polls backend health every 1 minute (60,000 ms)", async () => {
        vi.mocked(checkHealthAPI).mockResolvedValue(true);

        renderHook(() => useHealth(), {wrapper});

        await act(async () => {
            await Promise.resolve();
        });

        expect(checkHealthAPI).toHaveBeenCalledTimes(1);

        // Advance 1 minute
        await act(async () => {
            vi.advanceTimersByTime(60 * 1000);
            await Promise.resolve();
        });

        expect(checkHealthAPI).toHaveBeenCalledTimes(2);

        // Advance another minute
        await act(async () => {
            vi.advanceTimersByTime(60 * 1000);
            await Promise.resolve();
        });

        expect(checkHealthAPI).toHaveBeenCalledTimes(3);
    });

    it("re-checks health when document becomes visible", async () => {
        vi.mocked(checkHealthAPI).mockResolvedValue(true);

        renderHook(() => useHealth(), {wrapper});

        await act(async () => {
            await Promise.resolve();
        });

        expect(checkHealthAPI).toHaveBeenCalledTimes(1);

        // Simulate visibility change to visible
        Object.defineProperty(document, "visibilityState", {
            configurable: true,
            get: () => "visible",
        });

        await act(async () => {
            document.dispatchEvent(new Event("visibilitychange"));
            await Promise.resolve();
        });

        expect(checkHealthAPI).toHaveBeenCalledTimes(2);
    });

    it("clears interval and visibility listener on unmount", async () => {
        vi.mocked(checkHealthAPI).mockResolvedValue(true);

        const {unmount} = renderHook(() => useHealth(), {wrapper});

        await act(async () => {
            await Promise.resolve();
        });

        unmount();

        // Advance timer after unmount
        await act(async () => {
            vi.advanceTimersByTime(60 * 1000);
            await Promise.resolve();
        });

        // Should not have been called again after unmount
        expect(checkHealthAPI).toHaveBeenCalledTimes(1);
    });
});
