<template>
  <q-page class="flex flex-center bg-black">
    <div class="concert fullscreen"></div>
    <div class="stage fullscreen show"></div>

    <q-card class="add-names column">
      <q-card-section>
        <h2 class="text-center q-mt-none q-mb-md text-white text-bold">Winner Picker</h2>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'WinnerPicker'
}
</script>

<style lang="scss">
.concert {
  background-image: url('../statics/concert.jpg');
  background-size: cover;
  background-position: center;
  z-index: 1;
}
.stage {
  background-image: url('../statics/stage.jpg');
  background-size: cover;
  background-position: center;
  z-index: 2;
  transform: translateY(-100%);
  transition: transform 0.3s;
  &.show {
    transform: translateY(0%);
  }
}
.add-names {
  background-color:#1E1E1E;
  z-index: 3;
  h2 {

  }
}

</style>
