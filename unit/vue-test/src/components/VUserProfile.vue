<template>
  <div class="user-profile">
    <img class="user-profile__avatar" :src="user.avatar_url" alt="">
    <div class="user-profile__name">
      {{ user.name }}
    </div>
    <div class="user-profile__bio">
      {{ user.bio }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.user-profile {
  border-top: 1px solid #ccc;
  padding-top: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-profile__avatar {
  border-radius: 50%;
  width: 150px;
  height: 150px;
}
.user-profile__name {
  margin-top: 14px;
  font-size: 24px;
  font-family: 'Bungee', cursive;
  text-transform: uppercase;
}
.user-profile__bio {
  margin-top: 14px;
  font-family: 'Open Sans', sans-serif;
}
</style>
