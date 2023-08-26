<template>
  <div v-if="currentUser" class="message" :class="currentUser.id === data.from.id ? 'selfUser' : 'otherUser'">
    <div class="thumbnail"><img v-if="(currentUser.id !== data.from.id)&& thumbnailError" src="../assets/user-solid.svg" />
    <img v-if="(currentUser.id !== data.from.id)&& !thumbnailError" @error="getImage" :src="data.from.thumbnail" /></div>
    <div class="userMessage" v-html="data.message"></div>
    <div class="thumbnail"><img v-if="(currentUser.id === data.from.id)&& thumbnailError" src="../assets/user-solid.svg" />
    <img v-if="(currentUser.id === data.from.id)&& !thumbnailError" :src="data.from.thumbnail" @error="getImage" /></div>
  </div>
</template>
<script>
export default {
  name: 'MessageCOMPONENT',
  components: {
	},
  props: ['data', 'currentUser'],
  data () {
    return {
      thumbnailError: false
    }
  },
  methods: {
    getImage() {
      this.thumbnailError = true
    }
  }
}
</script>
<style scoped>
.message {
  display: flex;
  margin: 10px 0  ;
}
.selfUser {
   justify-content: right;
    margin-left: 40%;
}
.otherUser {
   justify-content: left;
    margin-right: 40%;
}
.thumbnail {
  display: flex;
  align-items: flex-end;
}
.userMessage {
  padding: 8px;
  background-color: lightgrey;
  border-radius: 8px;
  margin: 0 12px;
  text-align: left;
  white-space: pre-wrap;
}
img {
  width: 48px;
}
</style>