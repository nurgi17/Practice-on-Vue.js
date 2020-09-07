<template>
  <q-page class="flex flex-center bg-black">
    <div class="concert fullscreen"></div>
    <div
      :class="{ 'show': !showWinnerScreen }"
      class="stage fullscreen"></div>

    <q-card
      v-if="!showWinnerScreen"
      class="add-names column">
      <q-card-section>
        <h2 class="text-center q-mt-none q-mb-md text-white text-bold">Winner Picker</h2>
        <q-input
          v-model="namesText"
          bg-color="white"
          filled
          placeholder="Enter names on separate lines."
          type="textarea"
          roww="10"
          cols="40"
        />
        <div
          class="row justify-center q-mt-md">
          <q-btn
            @click="pickWinner"
            :disabled="!namesText"
            label="Pick a winner"
            color="warning"
            size="lg"/>
        </div>
      </q-card-section>
    </q-card>
    <div
      v-else
      class="winner-screen">
      <h1
        v-if="pickedWinner"
        class="text-white absolute-top text-center text-bold">
        Winner!
      </h1>
      <div
        :class="{ 'zoom': zoomingNames }"
        class="name-card">
        <q-card
          v-if="currentName"
          dark
          :class="pickedWinner ? 'bg-green-7' : 'bg-warning'"
          bordered>
          <q-card-section>
            <div class="text-h6">{{ currentName }}</div>
          </q-card-section>
        </q-card>
      </div>
      <q-btn
        v-if="pickedWinner"
        @click="startAgain"
        color="warning"
        class="start-again absolute"
        label="Start again"/>
    </div>
    <audio
      v-if="showWinnerScreen"
      src="../statics/drums.mp3"
      autoplay></audio>
  </q-page>
</template>

<script>
let animateNamesInterval
export default {
  name: 'WinnerPicker',
  data () {
    return {
      showWinnerScreen: false,
      namesText: '',
      namesArray: [],
      currentName: '',
      pickedWinner: false,
      zoomingNames: false
    }
  },
  methods: {
    pickWinner () {
      this.showWinnerScreen = true
      this.initNamesArray()
      this.namesArray = this.shuffle(this.namesArray)
      this.animateNames()
      this.stopAnimatingNames()
      this.zoomNames()
    },
    zoomNames () {
      setTimeout(() => {
        this.zoomingNames = true
      }, 1000)
    },
    stopAnimatingNames () {
      setTimeout(() => {
        clearInterval(animateNamesInterval)
        this.pickedWinner = true
      }, 8400)
    },
    animateNames () {
      let count = 0
      setTimeout(() => {
        animateNamesInterval = setInterval(() => {
          this.currentName = ''
          if (count === this.namesArray.length - 1) {
            count = 0
          } else {
            count++
          }
          setTimeout(() => {
            this.currentName = this.namesArray[count]
          }, 100)
        }, 200)
      }, 700)
    },
    initNamesArray () {
      this.namesArray = this.namesText.split('\n')
    },
    startAgain () {
      this.showWinnerScreen = false
      this.pickWinner = false
      this.currentName = ''
      this.zoomingNames = false
    },
    shuffle (a) {
      let j, x, i
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
      }
      return a
    }
  }
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
  .q-textarea {
    textarea {
      font-size: 22px;
      line-height: 1.3em;
    }
  }
}
.winner-screen {
  z-index: 4;
  .name-card {
    transform: scale(0.5);
    transition: transform 7.4s linear;
    &.zoom {
      transform: scale(3);
    }
    .q-card {
      box-shadow:
        0 0 15px 7.5px #fff,
        0 0 25px 15px #f0f,
        0 0 35px 22.5px #0ff;
    }
  }
  .start-again {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
}

</style>
