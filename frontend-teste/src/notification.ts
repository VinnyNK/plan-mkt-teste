import Vue from 'vue'

export default new Vue({
    methods: {
        send(header: string, content: string, type: string, options = {}) {
            this.$emit('sendNotification', {header, content, type, ...options})
        },
        whenSend (callback: any) {
            this.$on('sendNotification', callback)
        }
    }
})
