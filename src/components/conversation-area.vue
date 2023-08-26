<template>
  <div id="conv" :style="{ height: getBottom() }">
    <Message
      v-for="(message, index) in messages"
      :key="index"
      :data="message"
      :currentUser="currentUser"
    ></Message>
  </div>
</template>
<script>
import Message from "./message.vue";
export default {
  components: {
    Message,
  },
  props: ["currentUser", "messages"],
  data() {
    return {
      currHeight: null,
    };
  },
  created() {
    setTimeout(() => {
      const conv = document.getElementById("conv");
      if (conv) {
        conv.scrollTop = conv.scrollHeight;
      }
    });
  },
  methods: {
    getBottom() {
      const h =
        document.getElementById("app").offsetHeight -
        (document.getElementById("compose")
          ? document.getElementById("compose").offsetHeight
          : 0 || 0);
      setTimeout(() => {
        const conv = document.getElementById("conv");
        if (conv) {
          conv.scrollTop = conv.scrollHeight;
        }
      });
      this.currHeight = h;
      return h + "px";
      // return (document.getElementById('compose') ? document.getElementById('compose').offsetHeight : 0 || 0) + 'px';
    },
  },
};
</script>
<style scoped>
#conv {
  overflow: auto;
}
</style>