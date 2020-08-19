<template>
  <div id="app">
    <section class="section-book">
      <div class="row">
        <div class="book">
          <div class="book__form">
            <ImageLinkForm
              :rank="rank"
              :onImageLinkSubmit="onImageLinkSubmit"
              :onImageLinkChange="onImageLinkChange"
              :foodContents="foodContents"
            />
            <ul class="model-container-tag-list">
              <li class="model-container-tag-list-column">
                <p>
                  <span class="predicted-concept-name">Predicted concept</span>
                </p>
                <p>
                  <span class="tag-prob">Probability</span>
                </p>
              </li>
            </ul>
            <foodContent
              v-for="foodContent in foodContents"
              :foodContent="foodContent"
              :key="foodContent.name"
            />
          </div>

          <div class="detect-image">
            <div>
              <div class="u-margin-bottom-medium">
                <h2 class="heading-secondary">Experience the power of AI with Images</h2>
              </div>

              <FoodImage :imageUrl="imageUrl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Clarifai from "clarifai";
import { reactive, toRefs } from "@vue/composition-api";
import ImageLinkForm from "./components/ImageLinkForm";
import FoodImage from "./components/FoodImage";
import foodContent from "./components/FoodContent";
export default {
  name: "App",
  components: {
    ImageLinkForm,
    FoodImage,
    foodContent,
  },
  setup() {
    // creating an instance of Clarifai
    const app = new Clarifai.App({
      apiKey: process.env.CLARIFAI_API_KEY,
    });

    const state = reactive({
      imageUrl: "",
      inputField: "",
      foodContents: [],
      rank: 0,
    });

    const onImageLinkChange = (event) => {
      state.inputField = event.target.value;
      console.log(state.inputField);
    };

    const displayFoodContent = (data) => {
      const foodItems = data.outputs[0].data.concepts;
      return foodItems.map((foodItem) => {
        const name = foodItem.name;
        const val = foodItem.value;
        return {
          name,
          val,
        };
      });
    };

    const listFood = (data) => {
      console.log(data);
      state.foodContents = data;
    };

    const incrementRank = () => {
      state.rank++;
    };

    //Submit our image url to the Clarifai face detection model api
    const onImageLinkSubmit = (event) => {
      state.imageUrl = state.inputField;

      //Make request to the clarifai face detection model api endpoint
      app.models
        .predict(Clarifai.FOOD_MODEL, state.inputField)
        .then((response) => {
          listFood(displayFoodContent(response));
          incrementRank();
        })
        .catch((err) => console.log(err));
    };

    return {
      ...toRefs(state),
      onImageLinkSubmit,
      onImageLinkChange,
    };
  },
};
</script>

<style>
li {
  list-style: none;
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
