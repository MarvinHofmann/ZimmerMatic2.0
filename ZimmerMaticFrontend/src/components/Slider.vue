<template>
   <div> 
    <p id="rangeValue" class="mb-0">{{ this.rangeSlider }}%</p>
    <p class="mt-0 mb-0">{{ this.caption_top }}</p>
    <input
      type="range"
      orient="vertical"
      min="0"
      max="100"
      v-model="rangeSlider"
      @change="send_parent()"
    />
    <p class="mb-0">{{ this.caption_bottom }}</p>
    <p >{{ this.slidername }}</p>
  </div>
</template>

<script>
export default {
  props: ["slidername", "caption_top", "caption_bottom", "startValue"],
  data() {
    return {
      rangeSlider: 0,
    };
  },
  methods: {
    send_parent(){
      this.$emit("changeValue", {val:this.rangeSlider, name:this.slidername})
    }
  },
  emits:["changeValue"]
};
</script>

<style scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#rangeValue {
  font-size: 35px;
  text-align: center;
  color: rgb(54, 54, 54);
}

input[type="range"][orient="vertical"] {
  -webkit-appearance: slider-vertical;
  height: 300px;
  width: 90px;
  border-radius: 7px;
  background: #e6e1e1;
  outline: none;
  overflow: hidden;
}

input[type="range"][orient="vertical"]::-webkit-slider-runnable-track {
  width: 120px;
  background: rgb(189, 189, 189);
  border: 0px solid black;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: #e7e2e2;
  border-radius: 10px;
  /**box-shadow: 0px 340px 0px 340px #017ce7;*/
  box-shadow: 0px 340px 0px 340px #1266F1;
  cursor: pointer;
  margin-right: -50px;
}

input[type="range"][orient="vertical"]::-moz-range-thumb {
  width: 120px;
  background: rgb(197, 188, 188);
  border: 0px solid black;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  border-radius: 0px;
  box-shadow: 0px 340px 0px 340px #1266F1;
  cursor: pointer;
  margin-right: -50px;
}
</style>
