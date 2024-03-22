<script setup>
import { UserOutlined } from '@vicons/antd';
import { useRouter } from 'vue-router';

const router = useRouter();
const formRef = ref();
const formValue = reactive({
  name: '',
  password: ''
});
const rules = {
  name: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }
};

const onLogin = () => {
  formRef.value.validate((valid) => {
    if (valid) return;
    router.replace('/');
  });
};
</script>
<template>
  <div class="h-screen w-screen relative flex flex-items-start bg-#6181FF">
    <img class="h-full" src="assets/bg.png" alt="" />
    <div
      class="login-form box-border px-40px pt-40px absolute w-426px h-472px bg-white rounded-32px right-50 top-50% translate-y--50%"
    >
      <h1 class="font-500 font-size-36px tracking-2px">登录</h1>
      <p class="font-size-15px color-gray">请输入用户信息</p>
      <div class="mt-50px">
        <n-form
          size="large"
          :show-label="false"
          ref="formRef"
          :model="formValue"
          :rules="rules"
        >
          <n-form-item label="用户名" path="name">
            <n-input
              round
              v-model:value="formValue.name"
              placeholder="请输入账号"
              maxlength="10"
            >
              <template #suffix>
                <n-icon :component="UserOutlined" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item class="mt-10px" label="密码" path="password">
            <n-input
              round
              v-model:value="formValue.password"
              placeholder="请输入密码"
              type="password"
              show-password-on="click"
              maxlength="11"
            />
          </n-form-item>
          <n-form-item class="mt-20px">
            <n-button
              block
              round
              attr-type="button"
              type="primary"
              @click="onLogin"
            >
              登录
            </n-button>
          </n-form-item>
        </n-form>
        <n-divider />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scope>
.login-form {
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}
</style>
