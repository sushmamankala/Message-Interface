<template>
  <div class="interface">
    <ConversationArea
      :currentUser="currentUser"
      :messages="messages"
    ></ConversationArea>
    <Compose @sendMessage="sendMessage"></Compose>
  </div>
</template>

<script>
import ConversationArea from "./conversation-area.vue";
import Compose from "./compose.vue";
// import axios from 'axios'
import { currentUser, conversation } from "../assets/data";
export default {
  name: "HelloWorld",
  components: {
    ConversationArea,
    Compose,
  },
  data() {
    return {
      currentUser: null,
      messages: [],
    };
  },
  created() {
    this.currentUserData();
    this.getConversation();
  },
  methods: {
    async currentUserData() {
      this.currentUser = JSON.parse(currentUser);
    },
    async getConversation() {
      this.messages = JSON.parse(conversation);
    },
    sendMessage(message) {
      this.messages.push({
        id: this.messages.length,
        from: this.currentUser,
        message,
        date: new Date("YYYY-MM-DD HH:mm:ss"),
        sending: true,
      });
      const sendIndex = this.messages.length - 1;
      setTimeout(() => {
        this.messages[sendIndex].sending = false;
      }, 500);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.interface {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
