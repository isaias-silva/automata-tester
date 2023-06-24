
<template >
    <div class="widow">
        <button class="close-btn" @click="close">x</button>
        <div class="popup">
            <h3>{{ title }}</h3>
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MyPopUp',
  
    props: {
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true

        }


    }, methods: {
        close(){
            this.$emit('close');
        }
    },
    

})
</script>
<style scoped>
.widow {
    background-color: #000000a1;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 999 !important;
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn {
    width: 40px;
    height: 40px;
    color: #fff;
    background-color: var(--component-color);
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 100%;
    position: absolute;
    top: 15px;
    right: 0;
    transition: 0.5s linear;
}

.close-btn:hover {
    cursor: pointer;
    background-color: var(--component-two-color);
}

.popup {
    width: 40%;
    min-height: 200px;
    border-radius: 20px;
    background-color: var(--modal-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--popup-text-color);
    transition: 0.5s linear;
}
.popup h3{
    margin-bottom: 20px;
}
</style>