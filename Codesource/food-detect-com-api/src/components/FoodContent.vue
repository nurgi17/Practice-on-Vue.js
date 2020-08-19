<template>
  <div>
    <!-- <div class="food-content">
            <p>{{foodContent.name}}</p>
            <p>{{foodContent.val}}</p>
    </div>-->
    <ul class="model-container-tag-list">
      <li class="model-container-tag-list-column">
        <p>
          <span class="predicted-concept-name">{{foodContent.name}}</span>
        </p>
        <p>
          <span class="tag-prob">{{foodContent.val}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    foodContent: {
      type: Object,
    },
  },
};
</script>
<style scoped>
li {
  list-style: none;
}
.food-content {
  background-color: #7355c5;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.model-container-tag-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.model-container-tag-list-column {
  margin-top: 25px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 1rem;
}
.predicted-concept-name {
  z-index: 1;
  font-family: "Roboto Mono", sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  padding: 12px 0;
  letter-spacing: 0.2px;
  color: #1b2634;
}
.tag-prob {
  z-index: 1;
  padding: 0 0 0 5px;
  font-family: "Roboto Mono", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #1c2838;
}
</style>