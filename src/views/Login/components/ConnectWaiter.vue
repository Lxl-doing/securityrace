<template>
  <div class="connect-waiter-container">
    <ul>
      <li
        v-for="item in waiters"
        :key="item.name"
      >
        {{item.name+'：'+item.tel}}
      </li>
    </ul>
    <div class="search">查询成绩<i class="el-icon-arrow-right"></i></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      waiters: [
        {
          name: "客服1",
          tel: "15236628802",
        },
        {
          name: "客服2",
          tel: "15236628802",
        },
        {
          name: "客服3",
          tel: "15236628802",
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
.connect-waiter-container {
  width: 180px;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(96, 98, 107, 0.12);
  position: absolute;

  &::after {
    cursor: pointer;
    content: "联系客服";
    display: block;
    position: absolute;
    left: 180px;
    top: 50%;
    transform: translate(0, -50%);
    width: 30px;
    height: 112px;
    box-sizing: border-box;
    padding: 16px 7px 16px 9px;
    background: rgba(72, 73, 77, 1);
    color: #fff;
    line-height: 20px;
    font-size: 14px;
    border-radius: 0 4px 4px 0;
  }
}

ul {
  margin-left: 23px;
  margin-top: 24px;
}

li,
.search {
  height: 20px;
  line-height: 20px;
  margin-bottom: 22px;
  cursor: pointer;

  &:hover {
    color: #1c92ff;
  }
}

.search {
  margin-left: 23px;
  margin-bottom: 24px;

  i {
    margin-left: 68px;
    font-weight: bold;
  }
}
</style>