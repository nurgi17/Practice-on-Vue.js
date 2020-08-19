<template>
  <div class="img-detect">
    <img :src="imageUrl" alt width="100%" />
  </div>
</template>

<script>
export default {
  name: "FoodImage",
  props: {
    imageUrl: {
      type: String,
    },
  },
  //   setup(props) {
  //       const foodImageUrl = props.imageUrl;
  //       return{
  //           foodImageUrl
  //       }
  //   }
};
</script>

<style>
</style>
