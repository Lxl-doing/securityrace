<template>
  <div class="test-list-container">
    <header></header>
    <div class="list">
      <div
        class="content"
        ref="content"
      >
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="item"
          :ref="`item${index}`"
        >
          <p>{{item.content}}</p>
          <template v-if="item.type=='single'">
            <el-radio-group v-model="values[index]">
              <el-radio
                v-for="(it,i) in item.selectLists"
                :key="i"
                :label="i+1"
              >{{it}}</el-radio>
            </el-radio-group>
          </template>
          <template v-else>
            <el-checkbox-group v-model="values[index]">
              <el-checkbox
                v-for="(it,i) in item.selectLists"
                :key="i"
                :label="i+1"
              >{{it}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    $route(newVal, oldVal) {
      console.log(+newVal.hash.slice(1));
      this.setScroll(+newVal.hash.slice(1));
    },
  },

  data() {
    return {
      titles: [],
      values: null,
    };
  },
  methods: {
    getType(type) {
      const obj = {};
      if (type == "single") {
        obj.wrapper = "el-radio-group";
        obj.content = "el-radio";
      } else {
        obj.wrapper = "el-checkbox-group";
        obj.content = "el-checkbox";
      }
      return obj;
    },

    getValues() {
      let obj = {};
      for (let i = 0; i < this.titles.length; i++) {
        if (this.titles[i].type == "single") {
          obj[`box${i}`] = 0;
        } else {
          obj[`box${i}`] = [];
        }
      }
      return obj;
    },

    getValues2() {
      const arr = [];
      for (let i = 0; i < this.titles.length; i++) {
        if (this.titles[i].type == "single") {
          arr.push(0);
        } else {
          arr.push([]);
        }
      }
      return arr;
    },

    // num题号，从1开始
    setScroll(num) {
      const dom = this.$refs.content;
      dom.scrollTop =
        this.$refs[`item${num - 1}`][0].getBoundingClientRect().top -
        this.$refs.item0[0].getBoundingClientRect().top;
    },
  },

  created() {
    this.$store.commit("test/setTitles");
    this.titles = this.$store.state.test.titles;
    this.values = this.getValues2();
    this.$store.commit("test/setAnswer", this.values);
    // console.log(this.$store.state.test.answer);
  },

  // mounted() {
  //   const dom = this.$refs.content;
  //   console.log(this.$refs.item4[0]);
  //   console.log(this.$refs.item4[0].getBoundingClientRect());
  //   console.log(this.$refs.item0[0].getBoundingClientRect());
  //   dom.scrollTop =
  //     this.$refs.item4[0].getBoundingClientRect().top -
  //     this.$refs.item0[0].getBoundingClientRect().top;
  // },
};
</script>

<style scoped lang="less">
.test-list-container {
  width: 988px;
  height: calc(100vh - 84px - 50px);
  background: #fff;

  header {
    width: inherit;
    height: 36px;
    // background: lime;
  }

  .list {
    width: inherit;
    height: calc(100vh - 86px - 50px - 36px);
    // background: pink;

    .content {
      width: 921px;
      height: inherit;
      // background: lime;
      margin-left: 65px;
      overflow: auto;
      scroll-behavior: smooth;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 7px;
        background: #d5d7de;
      }

      .item {
        margin-bottom: 26px;

        p {
          -moz-user-select: none; /* Firefox私有属性 */
          -webkit-user-select: none; /* WebKit内核私有属性 */
          -ms-user-select: none; /* IE私有属性(IE10及以后) */
          -khtml-user-select: none; /* KHTML内核私有属性 */
          -o-user-select: none; /* Opera私有属性 */
          user-select: none; /* CSS3属性 */
        }
      }

      .el-radio,
      .el-checkbox {
        // background: lime;
        width: 168px;
        height: 20px;
        line-height: 20px;
        margin-top: 10px;
        margin-right: 0px;
      }
      .el-checkbox {
        width: 100%;
      }
    }
  }
}
</style>