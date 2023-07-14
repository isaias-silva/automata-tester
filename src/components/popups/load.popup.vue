
<template >
    <div class="widow">

        <div class="popup">
            <div class="load">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoadPopUp',
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
    width: 50%;
    min-height: 300px;
    border-radius: 20px;
    background-color: var(--modal-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--popup-text-color);
    transition: 0.5s linear;
}

.popup .load {
    width: 30%;
    position: relative;
}

span {
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    height: 10px;
    margin: auto;
    margin: 4px;
    border-radius: 10px;

}

span::after {
    content: " ";
    height: 25px;
    width: 25px;
    border-radius: 100%;
    display: block;
    background-color: var(--component-two-color);
}

span:nth-child(1) {

    animation: rotate 1s infinite;
}

span:nth-child(2) {

    animation: rotate 1.1s infinite;
}

span:nth-child(3) {

    animation: rotate 1.2s infinite;
}

span:nth-child(4) {

    animation: rotate 1.3s infinite;
}

span:nth-child(5) {

    animation: rotate 1.4s infinite;
}

span:nth-child(6) {

    animation: rotate 1.5s infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {

        transform: rotate(360deg);
    }
}</style>