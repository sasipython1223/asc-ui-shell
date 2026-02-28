/**
 * Telemetry stub. Replace with OpenTelemetry or your metrics pipeline.
 * Metric names must match Standards_Handbook_v1.0.0.md
 */
export type MetricName =
  | "view_load_ms"
  | "api_latency_ms"
  | "ui_error_count"
  | "fps_avg"
  | "run_progress_pct";

export type MetricAttrs = Record<string, string | number | boolean>;

function safeLog(event: unknown) {
  // Never log secrets/PII; keep payloads small.
  // eslint-disable-next-line no-console
  console.log(event);
}

export const telemetry = {
  metric(name: MetricName, value: number, attrs: MetricAttrs) {
    safeLog({ t: Date.now(), name, value, attrs });
  },
  error(route: string) {
    safeLog({ t: Date.now(), name: "ui_error_count", value: 1, attrs: { route } });
  }
};
