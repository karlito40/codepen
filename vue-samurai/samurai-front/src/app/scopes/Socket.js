export default {
  methods: {
    disconnect() {
      this.$socket.disconnect();
    },

    connect() {
      this.$socket.connect();
    }
  },

  render() {
    return this.$scopedSlots.default({
      disconnect: this.disconnect,
      connect: this.connect,
    });
  }
}