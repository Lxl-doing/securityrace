<template>
  <div class="test-number-container">
    <header></header>
    <div class="numbers">
      <div
        v-for="item in titles.length"
        :key="item"
        class="num"
        :class="{active:Answered[item-1]}"
        :ref="`item${item-1}`"
      >{{item}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("test", ["titles", "answer"]),
    Answered() {
      const arr = this.answer;
      // console.log(arr);
      const arr2 = [];
      for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] == "object") {
          if (arr[i].length) {
            arr2.push(true);
          } else {
            arr2.push(false);
          }
        } else if (arr[i]) {
          arr2.push(true);
        } else {
          arr2.push(false);
        }
      }
      return arr2;
    },
  },

  created() {
    this.$store.commit("test/setTitles");
  },

  mounted() {
    // 绑定每个题号，点击增加hash
    for (let i = 0; i < this.titles.length; i++) {
      let dom = this.$refs[`item${i}`][0];
      let hash = `#${i + 1}`;
      let _This = this;
      dom.onclick = function () {
        if (_This.$route.hash == hash) {
          return;
        } else {
          _This.$router.push(hash);
        }
      };
    }
  },
};
</script>

<style scoped lang="less">
.test-number-container {
  width: 210px;
  height: calc(100vh - 84px - 50px);
  box-sizing: border-box;
  background: #fff;

  header {
    height: 36px;
    box-shadow: 0 2px 8px 0 rgba(96, 98, 107, 0.16);
  }

  .numbers {
    width: 198px;
    height: calc(100vh - 84px - 50px - 36px - 12px);
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    margin: 12px 0px 0px 10px;
    // background: lime;

    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 7px;
      background: #d5d7de;
    }

    .num {
      cursor: pointer;
      display: inline-block;
      width: 26px;
      height: 26px;
      line-height: 26px;
      margin: 0 10px 10px 0;

      background: #dcdee6;
      border: 0 solid #c0c1cc;
      border-radius: 4px;

      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #48494d;
      text-align: center;
    }

    .active {
      background: #1c92ff;
      color: #fff;
    }
  }
}
</style>