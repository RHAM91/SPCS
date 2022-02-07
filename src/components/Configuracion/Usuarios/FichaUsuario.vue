<template>
    <div class="contenedor_full">
        <div class="banner_full_" style="background-color: #292961;">
            <b-button type="button" size="sm" variant="outline-danger" @click="cerrar">Cerrar</b-button>
        </div>
        <div class="datos_usuario">
            <div class="seccion_foto_usuario">
                <div class="foto_usuario">
                    
                </div>
            </div>
            <div class="seccion_nombre_usuario">
                {{iUsuario.nombre}} {{iUsuario.apellidos}}
            </div>
            <div class="usuario_usuario">
                @{{iUsuario.usuario}}  <i class="fas fa-lock" style="margin-left: 15px;margin-right: 5px;"></i> : {{iUsuario.bloqueo | mbloqueo}}
            </div>
            <div class="botonera">
                <b-button type="button" size="sm" style="margin-right: 10px;" variant="outline-primary" @click="actualizar">Actualizar</b-button>
                <b-button type="button" size="sm" style="margin-right: 10px;" variant="outline-info" @click="permisos">Permisos</b-button>
                <b-button type="button" size="sm" style="margin-right: 10px;" variant="outline-danger" @click="actualizar">Subir foto</b-button>
                <b-button type="button" size="sm" variant="outline-warning" @click="BloquearUsuario">Bloquear</b-button>
            </div>
        </div>

        <b-container v-if="formularioActualizar">
            <form @submit.prevent="update">
                <b-row>
                    <b-col sm="4" class="mt-3">
                        <label for="">Nombre</label>
                        <b-form-input type="text" id="primercampo" v-model="nombre" size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="4" class="mt-3">
                        <label for="">Apellidos</label>
                        <b-form-input type="text" v-model="apellidos" size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="4" class="mt-3">
                        <label for="">Género</label>
                        <select class="form-control form-control-sm" v-model="genero">
                            <option value="">Selecciona</option>
                            <option value="M">Másculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <label for="">Usuario</label>
                        <b-form-input type="text" v-model="usuario" size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="6" class="mt-3">
                        <label for="">Contraseña</label>
                        <b-form-input type="password" v-model="pwd1" size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="6" class="mt-3">
                        <label for="">Repetir Contraseña</label>
                        <b-form-input type="password" v-model="pwd2" size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                        <b-button type="submit" size="sm" variant="primary">Actualizar</b-button>
                    </b-col>
                </b-row>
            </form>
        </b-container>

        <b-container v-if="formularioPermisos">
            <Permisos />
        </b-container>

    </div>
</template>

<script>

import { IP, PUERTO } from '@/config/parametros'
import axios from 'axios'
import { mapActions } from 'vuex'
import { minix } from '../../functions/alertas'

import Permisos from './Permisos.vue'

export default {
    name: 'FichaUsuario',
    props:['itemUsuario'],
    components: {
        Permisos
    },
    filters:{
        mbloqueo: function(val){
            if (val == 0) {
                return 'No'
            }else{
                return 'Si'
            }
        }
    },
    data() {
        return {
            formularioActualizar: false,
            formularioPermisos: true,
            nombre: '',
            apellidos: '',
            usuario: '',
            genero: '',
            pwd1: '',
            pwd2: '',
            iUsuario: {},
            idusuario: ''
        }
    },
    methods: {
        cerrar(){
            this.$emit('salir')
        },
        async obtenerInfoUsuario(){

            let l = await axios.get(`http://${IP}:${PUERTO}/api/usuarios/${this.itemUsuario}`, this.$store.state.token)
            this.iUsuario = l.data
            this.nombre = l.data.nombre
            this.apellidos = l.data.apellidos
            this.usuario = l.data.usuario
            this.idusuario = l.data.id
            this.genero = l.data.sexo
        },
        actualizar(){
            this.formularioActualizar = true
            this.formularioPermisos = false
        },
        async update(){

          
            if (this.pwd1 == '' && this.pwd2 == '') {
                let f = {
                    api: 'usuarios',
                    id: this.idusuario,
                    modo: 'param',
                    pull: false,
                    formulario: {
                        nombre: this.nombre,
                        apellidos: this.apellidos,
                        usuario: this.usuario,
                        sexo: this.genero
                    }
                }

                await this.updateData(f)
            }else{

                if (this.pwd1 == this.pwd2 ) {
                    let f = {
                        api: 'usuarios',
                        id: this.idusuario,
                        pull: false,
                        formulario: {
                            nombre: this.nombre,
                            apellidos: this.apellidos,
                            usuario: this.usuario,
                            sexo: this.genero,
                            pass: this.pwd1
                        }
                    }
    
                    await this.updateData(f)
                }else{
                    minix({icon: 'error', mensaje: 'Las campos de contraseña no coinciden', tiempo: 3000})
                }
            }
            
 
        },
        async BloquearUsuario(){
            let f = {
                api: `usuarios/bloquear/c?id=${this.idusuario}&modo=bloquear`,
                modo: 'query',
                pull: false,
                formulario:{
                    bloqueo : 1
                }
            }

            await this.updateData(f)
        },
        permisos(){
            this.formularioPermisos = true
            this.formularioActualizar = false
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        this.obtenerInfoUsuario()
        //document.getElementById('primercampo').focus()
    },
}
</script>

<style>
    .datos_usuario{
        width: 100%;
        height: 350px;
        background-color: #fafafa;
        border-bottom: 1px solid #dbdbdb;
    }
        .seccion_foto_usuario{
            width: 100%;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

            .foto_usuario{
                width: 150px;
                height: 150px;
                border-radius: 50%;
                border: 1px solid blue;
            }

        .seccion_nombre_usuario{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            font-size: 21px;

        }
            .usuario_usuario{
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .botonera{
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

        .titulo_fichausuario{
            width: 100%;
            height: 50px;
            font-size: 35px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
</style>