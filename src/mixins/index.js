export default {
    methods: {
        goRealtimeCapture(deviceSn) {
            window.open(
                location.href + "panda-admin/realtime-capture?deviceSn=" + deviceSn
            )
        }
    },
}