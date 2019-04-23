import { socket } from '@/socket';

export default {
  methods: {
    disconnect() {
      socket().disconnect();
    },

    connect() {
      socket().connect();
    }
  },

  render() {
    return this.$scopedSlots.default({
      disconnect: this.disconnect,
      connect: this.connect,
    });
  }
}