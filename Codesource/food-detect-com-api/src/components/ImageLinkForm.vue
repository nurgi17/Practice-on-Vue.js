<template>
  <div>
    <form @submit.prevent="onImageLinkSubmit" class="form">
      <div class="u-margin-bottom-medium">
        <h2 class="heading-primary">Welcome Your current image count is....</h2>
      </div>

      <div class="t-center u-margin-bottom-medium">
        <Rank :rankCount="rank" />
      </div>

      <div class="form__group">
        <input
          type="text"
          @change="onImageLinkChange"
          class="form__input"
          placeholder="Image url"
          id="name"
          required
        />
        <label for="name" class="form__label">Image url</label>
      </div>

      <div class="form__group">
        <button class="btn btn--green" type="submit">Detect&rarr;</button>
      </div>
    </form>
  </div>
</template>

<script>
import Rank from "./Rank";

export default {
  name: "ImageLinkForm",
  components: {
    Rank,
  },
  props: {
    rank: {
      type: Number,
      required: true,
    },
    onImageLinkSubmit: {
      type: Function,
    },
    onImageLinkChange: {
      type: Function,
    },
  },
};
</script>

<style>
</style>
