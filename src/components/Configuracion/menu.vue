<template>
    
    <div class="seccion_b">
        <div class="sub_menu_a">



            <div class="top_cuerpo_seccion_b">
                Configuración
            </div>

            <div class="submenu_titulo">
                Datos
            </div>
            <div v-if=" tipo == 'root' || permisos.privilegios.ver == 1" class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fab fa-black-tie"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('privilegios')">
                    Privilegios
                </div>
            </div>
            <div v-if=" tipo == 'root' || permisos.areas.ver == 1" class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-street-view"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('areas')">
                    Áreas
                </div>
            </div>
            <div v-if=" tipo == 'root' || permisos.profesiones.ver == 1" class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-user-tie"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('profesiones')">
                    Profesiones
                </div>
            </div>

            <div v-if=" tipo == 'root' || permisos.ancianos.ver == 1" class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-male"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('ancianos')">
                    Ancianos
                </div>
            </div>
            <div v-if=" tipo == 'root' || permisos.estadocivil.ver == 1" class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-heart"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('estadocivil')">
                    Estado Civil
                </div>
            </div>            
            <div v-if=" tipo == 'root' || permisos.estadocivil.ver == 1" class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-home"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('lugares_discipulado')">
                    Lugares de discipulado
                </div>
            </div>
            <div class="submenu_titulo">
                Sistema
            </div>

            <div v-if=" tipo == 'root' || permisos.usuarios.ver == 1" class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('usuarios')">
                    Usuarios
                </div>
            </div>


        </div>


        <div class="cuerpo_seccion_b">
            <div class="top_cuerpo_seccion_b">
                
            </div>
            <div class="cuerpo_sub_seccion_b">

                <Privilegios v-if="sub_modulo == 'privilegios'"/>
                <Areas v-if="sub_modulo == 'areas'"/>
                <Usuarios v-if="sub_modulo == 'usuarios'"/>
                <Profesiones v-if="sub_modulo == 'profesiones'"/>
                <Ancianos v-if="sub_modulo == 'ancianos'" />
                <EstadoCivil v-if="sub_modulo == 'estadocivil'" />
                <LugaresDiscipulado v-if="sub_modulo == 'lugares_discipulado'" />
            </div>
        </div>
    </div>
</template>

<script>

import Privilegios from './Privilegios/Privilegios.vue'
import Areas from './Areas/Areas.vue'
import Usuarios from './Usuarios/Usuarios.vue'
import Profesiones from './Profesiones/Profesiones.vue'
import Ancianos from './Ancianos/Ancianos.vue'
import EstadoCivil from './EstadoCivil/EstadoCivil.vue'
import LugaresDiscipulado from './LugresDiscipulado/Lugares.vue'
import { mapState } from 'vuex'


export default {
    components:{
        Privilegios,
        Areas,
        Usuarios,
        Profesiones,
        Ancianos,
        EstadoCivil,
        LugaresDiscipulado
    },
    computed: {
        ...mapState(['permisos', 'tipo'])
    },
    data() {
        return {
            sub_modulo: ''
        }
    },
    methods: {
        set_submodulo(modulo){
            this.sub_modulo = modulo
        }
    },
    mounted() {
        //console.log(this.tipo)
    },
}
</script>

<style>
    
</style>