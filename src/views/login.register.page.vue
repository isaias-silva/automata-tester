<template>
    <form @submit.prevent="submitForm">
        <div class="menu">

            <button type="button" class="mode" @click="toggleDarkMode">

                <span class="moon"></span>
                <span class="sun"></span>
            </button>

        </div>
        <h3>{{ mode == 'login' ? 'Entre na sua conta' : 'registre sua conta teste' }}</h3>

        <img :src="require('@/assets/icons/profile.jpg')" alt="bot" class="icon-profile">
        <div class="inputBlock">
            <input v-model="name" type="text" placeholder="seu nome"  v-if="mode=='register'">
            <div class="block">
                <input v-model="email" type="email" placeholder="E-mail">
                <input v-model="number" v-mask="'(##) ####-####'" type="number" placeholder="seu número"   v-if="mode=='register'">
                <input v-model="password" type="password" placeholder="Senha">
                <input v-model="passwordRepite"  type="password" placeholder="repita a senha"   v-if="mode=='register'">
            </div>
           
         
              
            


        </div>
        <button type="submit">{{ mode=='login'?'Log in':'Register' }}</button>

        <span class="clickspan" @click="toggleLoginResister"> {{ mode=='login'?'não possui conta? registre!':'possui uma conta? entre!' }} </span>
        <div class="errorBlock">

            <span v-for="error in errors" v-bind:key="errors.indexOf(error)">
                {{ error.message }}
            </span>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginRequest from '@/services/login'
export default defineComponent({
    name: "loginPage",
    data(): {

        email?: string,
        password?: string,
        passwordRepite?:string,
        number?:number,
        name?:string,
        noturne: boolean,
        errors: { message: string, value: string }[],
        mode: 'login' | 'register'
    } {
        return {
            noturne: this.$cookies.get('noturne') ? true : false,
            errors: [],
            mode: 'login'
        }
    },
    methods: {
       async submitForm() {
            this.validateForm()
            if (this.errors.length > 0) {
                return
            } else {
                if(this.mode=='login' && this.email && this.password){
                   const info= await loginRequest({email:this.email,password:this.password})
                   const {data, status}=info
                   if(status==201){
                    this.$cookies.set('token',data.token)
                    this.$router.push('/')
                }
                }
            }


        },
        validateForm() {
            this.errors = []
            if (!this.email) {
                this.errors.push({ message: 'Digite um email.', value: 'email' });
            }

            if (this.email && !this.email.includes('@')) {
                this.errors.push({ message: 'Email inválido.', value: 'email' });
            }

            if (!this.password) {
                this.errors.push({ message: 'Digite uma senha válida.', value: 'password' });
            }

            if (this.password && this.password.length < 8) {
                this.errors.push({ message: 'Senha muito curta. Use no mínimo 8 dígitos.', value: 'password' });
            }
            if(this.mode=='register'){
                if(!this.name){
                    this.errors.push({ message: 'Digite um nome.', value: 'name' });
                }
                if(this.name && this.name.length<4){
                    this.errors.push({ message: 'nome muito curto, no minimo 4 digitos.', value: 'name' });
                }
                if(this.name && this.name.length>20){
                    this.errors.push({ message: 'nome muito longo use no maximo 20 digitos.', value: 'name' });

                }
                if(this.password!=this.passwordRepite){
                    this.errors.push({ message: 'senhas não são iguais.', value: 'password' })
                }
                if(!this.number){
                    this.errors.push({ message: 'numero de telefone é necessário.', value: 'number' })
                }
                if(this.number && this.number.toString().length<9){
                    this.errors.push({ message: 'numero inválido use no minimo 9 digitos', value: 'number' })

                }

                if(this.number && this.number.toString().length>14){
                    this.errors.push({ message: 'numero inválido use no máximo 14 digitos', value: 'number' })

                }
            }
            


        }, toggleDarkMode() {
            this.noturne = !this.noturne;
            if (this.noturne == true) {
                document.body.classList.add('dark');
                this.$cookies.set('noturne', this.noturne, '15d');
            } else {
                document.body.classList.remove('dark');
                this.$cookies.remove('noturne')
            }


        },toggleLoginResister(){
            this.mode=this.mode=='login'?'register':'login'
        },
    
    },mounted(){
        if(this.$cookies.get('token')){
            this.$router.push('/')
        }
    }


})
</script>
<style lang="css" scoped>
form {
    position: relative;
    background-color: var(--modal-color);
    color: var(--font-color);
    width: 40%;
    min-height: 250px;
    margin: auto;
    margin-top: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 8px 8px #1d1d1d99;
    transition: 1s linear;
}

.clickspan{
    color: var(--link-color);
    cursor: pointer;
    margin: 10px;
    transition: linear 1s;
}
.clickspan:hover{
    filter:invert(100%);
    text-decoration: underline;
}
.menu {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
}

.icon-profile {
    border-radius: 100%;
    width: 200px;
    height: 200px;
    margin: 15px 15px;
}

.errorBlock span {
    margin: auto;
    display: block;
    text-align: center;
    background-color: rgb(225, 130, 130);
    color: #ff0000;
    margin: 10px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
}

.inputBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;

}
.block{
    margin:10px;
    display: flex;
    flex-direction: column;
    width: 80%;
}
.inputBlock input {
    width: 100%;
    height: 30px;
    margin-bottom: 15px;
    border: 2px solid var(--component-two-color);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 5px;



}

.inputBlock input:focus {
    outline: none;
}

button[type="submit"] {
    width: 50%;
    border: none;
    background-color: var(--component-two-color);
    height: 30px;
    border-radius: 10px;
    transition: 0.4s linear;
}

 button[type="submit"]:hover {
    cursor: pointer;
    background-color: var(--link-color);
}

.mode {
    grid-area: btn;

}

.mode {
    background: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    width: 60px;
    height: 60px;
}

.mode .moon,
.mode .sun {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transition: transform 0.3s ease;
}

.mode .moon {
    background-color: #000;
    transition-delay: 0.1s;
    transform-origin: left;
}

.mode .sun {
    background-color: #ffc107;
    transition-delay: 0s;
    transform-origin: right;
}



.dark .mode .sun {
    transform: scale(2);
    transform: rotate(45deg);
    transform: translate(-50%, -50%) scale(0.5);


}</style>