import { battle as socketBattle } from '@/socket';

export default {
  methods: {
    join: socketBattle.join,
    list: socketBattle.list
  },

  render() {
    return this.$scopedSlots.default({
      join: this.join,
      list: this.list
    });
  }
}