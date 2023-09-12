<template>
  <div class="allboard">
    <h1>renove seu plano para ter acesso</h1>

    <div class="plans">
      <div v-for="product, key of products" :key="key" class="blockplan">
        <h3>{{ product.name }}</h3>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu_ip7G3oUseZI4Lu91vQZa42zp0joc-2PwOKcKzk_0G0UtotZH1b1VR1LsnZV4wD2XmA&usqp=CAU" alt="">
        <ul>
          
           <li>{{ product.rules.maxBots }} Bots</li>
         <li> {{ product.rules.maxGroups }} Grupos </li>
         <li>telegram e whatsapp</li> 
          
           </ul>
        <p class="price">
          {{ product.price}} R$<span> /{{ product.days }} dia(s) de acesso</span>
        </p>

        <RouterLink :to="`/pay?id=${product._id}`">eu quero</RouterLink>
      </div>
    </div>





  </div>
</template>
<script lang="ts">
import { Iproduct } from '@/interfaces/interface.payment.products';
import { defineComponent, ref } from 'vue'
import getProducts from '@/services/get.products'
import Gallery from '@/components/gallery.vue'
export default defineComponent({
  name: "PlanRenovatePage",

  data(): { products: Iproduct[] } {
    return {
      products: []
    }
  },
  async mounted() {
    await this.setProducts()
  },
  methods: {
    async setProducts() {
      const products = await getProducts()
      if (products) {
        console.log(products)
      
        this.products = products

      }
    }
  }
})

</script>
<style scoped>
.allboard {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--font-color);
 height: 100vh;
}


.plans {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row-reverse;
  margin-top: 20px;
}

.blockplan {

  background-color: #00000039;
  text-align: center;
  box-sizing: border-box;
  width: 30%;
  padding: 10px;
  border-radius: 10px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow: 5px 5px #0000005f;
  z-index: 999!important;
  
}

.blockplan a {
  width: 90%;
  height: 40px;
  font-size: 24px;
  border-radius: 10px;
  background-color: var(--link-color);
  border: 1px solid;
  transition: 0.4s linear;
  text-decoration: none;
  color: #141414;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blockplan a:hover {
  cursor: pointer;
  background-color: var(--component-two-color);
}

.blockplan ul {
  list-style-type: none;
  font-size: 18px;
}
.blockplan img{
  width: 100%;
  height: 300px;
  position: absolute;
  top:0;
  left: 0;
  
  opacity: 20%;


}

.price {
  font-size: 32px;
  font-weight: bold;
}

.price span {
  font-size: 18px;
  font-weight: initial;
}
</style>