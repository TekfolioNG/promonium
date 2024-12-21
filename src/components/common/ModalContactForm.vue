<!-- ModalContactForm.vue -->
<template>
    <div>
        <!-- Modal Overlay -->
        <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
            <!-- Modal Content -->
            <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 relative z-50">
                <button @click="closeModal"
                    class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Get in Touch</h3>

                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="form-group">
                            <label for="firstName"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                            <input type="text" id="firstName" v-model="formData.firstName" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div class="form-group">
                            <label for="lastName"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                            <input type="text" id="lastName" v-model="formData.lastName" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="email"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input type="email" id="email" v-model="formData.email" required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>

                    <div class="form-group">
                        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone
                            Number</label>
                        <input type="tel" id="phone" v-model="formData.phone" required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>

                    <div class="form-group">
                        <label for="message"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                        <textarea id="message" v-model="formData.message" rows="4" required
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
                    </div>

                    <button type="submit"
                        class="w-full bg-[#000066] hover:bg-[#000099] text-white font-bold py-3 px-6 rounded-md transition duration-300">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const isOpen = ref(false)
const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
})

// Track if this is the initial page load
const isInitialLoad = ref(true)

const checkHash = () => {
    // Only open the modal if it's not the initial page load
    if (!isInitialLoad.value) {
        isOpen.value = window.location.hash === '#contact-modal'
    } else {
        // If it's the initial load and the hash is #contact-modal, remove it
        if (window.location.hash === '#contact-modal') {
            window.location.hash = ''
        }
        isInitialLoad.value = false
    }
}

const closeModal = () => {
    isOpen.value = false
    window.location.hash = ''
}

// Add escape key handler
const handleEscKey = (event) => {
    if (event.key === 'Escape' && isOpen.value) {
        closeModal()
    }
}

const handleSubmit = async () => {
    try {
        // Add your form submission logic here
        console.log('Form submitted:', formData.value)
        // Reset form after successful submission
        formData.value = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
        }
        closeModal()
        alert('Message sent successfully!')
    } catch (error) {
        console.error('Error submitting form:', error)
        alert('Error sending message. Please try again.')
    }
}

onMounted(() => {
    window.addEventListener('hashchange', checkHash)
    window.addEventListener('keydown', handleEscKey)
    checkHash() // Check hash on initial load
})

onUnmounted(() => {
    window.removeEventListener('hashchange', checkHash)
    window.removeEventListener('keydown', handleEscKey)
})
</script>

<style scoped>
.form-group input:focus,
.form-group textarea:focus {
    @apply outline-none;
}
</style>