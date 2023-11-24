import type { FormProps, FormActionType, UseFormReturnType } from '../types/form';
import type { DynamicProps } from '/#/utils';

import { ref, onUnmounted, unref, nextTick, watch } from 'vue';
import { isProdMode } from '@/utils/env';
import { getDynamicProps } from '@/utils';



export function useForm(props) {
  const formRef = ref(null);
  const loadedRef = ref(false);

  async function getForm() {
    const form = unref(formRef);
    if (!form) {
      console.error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      );
    }
    await nextTick();
    return form;
  }

  function register(instance) {
    isProdMode() &&
      onUnmounted(() => {
        formRef.value = null;
        loadedRef.value = null;
      });
    if (unref(loadedRef) && isProdMode() && instance === unref(formRef)) return;

    formRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true,
      }
    );
  }

  const methods = {
    setProps: async (formProps) => {
      const form = await getForm();
      await form.setProps(formProps);
    },

    resetFields: async () => {
      getForm().then(async (form) => {
        await form.resetFields();
      });
    },

    clearValidate: async (name) => {
      const form = await getForm();
      await form.clearValidate(name);
    },

    getFieldsValue() => {
      return unref(formRef)?.getFieldsValue();
    },

    setFieldsValue: async(values) => {
      const form = await getForm();
      await form.setFieldsValue(values);
    },

    submit: async () => {
      const form = await getForm();
      return form.submit();
    },

    validate: async (nameList) => {
      const form = await getForm();
      return form.validate(nameList);
    },

    setLoading: (value) => {
      loadedRef.value = value;
    },

    setSchema: async (values) => {
      const form = await getForm();
      form.setSchema(values);
    },
  };

  return [register, methods];
}
