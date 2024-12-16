<template>
  <Transition name="fade">
    <div v-show="$show"
      class="bg-dark-blur z-1000 dialog pointer-events-auto fixed inset-0 grid w-full cursor-pointer place-items-center"
      @click="hide()">
      <div @click.stop class="container-md relative">
        <div class="surface-base dialog__inner dialog-grid relative overflow-hidden rounded-2xl shadow-xl">
          <div class="overflow-hidden md:block">
            <slot name="image" />
          </div>
          <div class="hide-scrollbar dialog__content relative overflow-hidden p-8 md:p-14">
            <form @submit.prevent="submit" class="grid gap-8">
              <div class="grid gap-4 pb-8">
                <h2 class="title-sm">{{ contact?.title }}</h2>

                <slot name="content" />
              </div>
              <div class="input-group z-20 w-full" v-if="contact.topics.length > 1">
                <Popper placement="bottom-start" offsetDistance="1" :show="showPopper" class="w-full">
                  <button type="button" @click="showPopper = !showPopper"
                    class="select surface-overlay w-full text-left">
                    {{ !!subject ? subject : "Select" }}
                  </button>

                  <template #content>
                    <ul>
                      <li v-for="(item, index) in contact.topics" :key="index" :class="subject == item.label ? 'bg-dark bg-opacity-10' : ''
                        ">
                        <button type="button" class="w-full p-2 text-left hover:bg-dark hover:bg-opacity-10" @click="
                          setSubject(item);
                        showPopper = false;
                        ">
                          {{ item.label }}
                        </button>
                      </li>
                    </ul>
                  </template>
                </Popper>

                <label
                  class="peer-placeholder-shown:left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-9 peer-focus:scale-75 peer-focus:text-primary">{{
                    t("subject") }} *</label>
              </div>
              <div class="input-group">
                <input type="text" name="name" placeholder=" " class="surface-overlay peer" v-model="form.name" />
                <label
                  class="peer-placeholder-shown:left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-9 peer-focus:scale-75 peer-focus:text-primary">{{
                    t("name") }} *</label>
              </div>

              <div class="input-group">
                <input type="text" name="Mobile" placeholder=" " class="surface-overlay peer" v-model="form.mobile" />
                <label
                  class="peer-placeholder-shown:left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-9 peer-focus:scale-75 peer-focus:text-primary">{{
                    t("Mobile") }} *</label>
              </div>

              <div class="input-group">
                <input type="email" name="email" placeholder=" " class="surface-overlay peer" v-model="form.email" />
                <label
                  class="peer-placeholder-shown:left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-9 peer-focus:scale-75 peer-focus:text-primary">{{
                    t("email") }}</label>
              </div>

              <div class="input-group">
                <textarea class="surface-overlay peer" name="message" id="" placeholder=" " cols="30" rows="2"
                  ref="textarea" v-model="input"></textarea>
                <label
                  class="peer-placeholder-shown:left-4 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-9 peer-focus:scale-75 peer-focus:text-primary">Message
                  *</label>
              </div>
              <div class="pointer-events-none right-5 mb-14 flex translate-y-10 justify-end md:sticky md:bottom-0">
                <button class="btn surface-primary pointer-events-auto" type="submit" :disabled="!canSubmit"
                  style="background-color: #000066;">
                  {{ t("submit") }}
                </button>
              </div>
              <Loading :loading="loading" />
            </form>
          </div>
        </div>
        <button class="btn btn-icon surface-dark btn-absolute -right-3 -top-3 z-10" @click="hide()">
          <slot />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Loading from "@components/common/Loading.vue";
import { useStore } from "@nanostores/vue";
import { showContact } from "@src/store";
import { t } from "@util/translate";
import { useTextareaAutosize } from "@vueuse/core";
import { useAsyncValidator } from "@vueuse/integrations/useAsyncValidator";
import { computed, reactive, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import {
  disableBodyScroll,
  enableBodyScroll
} from "body-scroll-lock";
import Popper from "vue3-popper";

const props = defineProps({
  contact: {
    type: Object,
    required: true
  },
});

const $show = useStore(showContact);
const form = reactive({ email: "", name: "", message: "", mobile: "" });
const { textarea, input } = useTextareaAutosize();

const rules = {
  name: [
    {
      type: "string",
      required: true,
      message: "Name is required"
    },
  ],
  mobile: [
    {
      type: "string",
      required: true,
      pattern: /^[0-9]{10,15}$/,
      message: "Please enter a valid mobile number (10-15 digits)"
    },
  ],
  message: [
    {
      type: "string",
      min: 10,
      required: true,
      message: "Message must be at least 10 characters long"
    },
  ],
};

const { pass, isFinished, errorFields } = useAsyncValidator(form, rules);

const subject = ref(null);
const showPopper = ref(false);
const loading = ref(false);
const subjectChannel = ref(null);
const subjectEmail = ref(null);

const hide = () => {
  showContact.set(false);
};

const setSubject = (data) => {
  subject.value = data.label;
  subjectEmail.value = data.email;
  subjectChannel.value = data.slack_id;
};

// Set default subject if only one topic exists
if (props.contact.topics.length === 1) {
  setSubject(props.contact.topics[0]);
}

const canSubmit = computed(() => {
  return isFinished.value && pass.value && !!subject.value;
});

// Reset form to initial state
const resetForm = () => {
  form.email = "";
  form.name = "";
  form.mobile = "";
  form.message = "";
  input.value = "";
  subject.value = null;
  subjectEmail.value = null;
  subjectChannel.value = null;
};

const submit = async () => {
  // First, validate form submission
  if (!canSubmit.value) {
    // Provide specific feedback about validation errors
    if (errorFields.value.length > 0) {
      errorFields.value.forEach(field => {
        toast.error(`${field.name}: ${field.errors[0]}`);
      });
    } else {
      toast.error("Please fill out all required fields correctly");
    }
    return;
  }

  // Set loading state
  loading.value = true;

  try {
    // Prepare email content
    const emailContent = `
Subject: ${subject.value}

Name: ${form.name}
Mobile: ${form.mobile}
Email: ${form.email || 'Not provided'}

Message:
${form.message}
    `;

    // Attempt to submit the form
    const response = await fetch("/api/send-mail", {
      method: "POST",
      body: JSON.stringify({
        to: "info@promoniumng.com",
        subject: `Contact Form: ${subject.value}`,
        text: emailContent
      }),
      headers: { "Content-Type": "application/json" },
    });

    // Parse response
    const data = await response.json();

    // Handle successful submission
    if (data.status === "ok") {
      toast.success(t("contact_thanks"));
      resetForm();
      hide();
    } else {
      // Handle server-side validation or processing errors
      toast.error(data.message || t("contact_error"));
    }
  } catch (error) {
    // Handle network or unexpected errors
    console.error("Submission error:", error);
    toast.error(t("contact_error"));
  } finally {
    // Always reset loading state
    loading.value = false;
  }
};

// Watch for modal show/hide to manage body scroll
watch(
  $show,
  (val) => {
    if (val) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  },
  { immediate: false },
);

// Sync textarea input with form message
watch(
  input,
  (val) => {
    form.message = val;
  },
  { immediate: false },
);
</script>

<style lang="postcss">
.z-1000 {
  z-index: 1000;
}

.dialog-grid {
  @apply grid grid-cols-1;

  @screen md {
    grid-template-columns: 4fr 5fr;
  }
}

.bg-dark-blur {
  @apply bg-dark bg-opacity-50 backdrop-blur-sm;
}

.dialog {
  --popper-theme-padding: 0;

  &__inner {
    max-height: calc(100vh - 2rem);
    overflow-x: hidden;
    overflow-y: auto;

    @screen md {
      height: min(100vh - 2rem, 40rem);
    }
  }

  &__content {
    @screen md {
      max-height: calc(100vh - 2rem);
      height: min(100vh - 2rem, 40rem);
      height: min(100vh - 2rem, 40rem);
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}

.input-group {
  @apply relative isolate;

  input,
  textarea,
  .select {
    @apply block w-full rounded-2xl px-3 py-2.5 focus:outline-primary;
  }

  label {
    @apply pointer-events-none absolute left-0 top-3 z-10 origin-[0] -translate-y-9 scale-75 transform text-sm duration-300;
  }
}
</style>