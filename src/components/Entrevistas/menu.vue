<template>
    
    <div class="seccion_b">
        <div class="sub_menu_a">


            <div class="top_cuerpo_seccion_b">
                Entrevistas
            </div>

            <div class="submenu_titulo">
                Actividades
            </div>

            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="far fa-check-circle"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('entrevistas_pendientes')">
                    Entrevistas pendientes
                </div>
            </div>

            <div class="submenu_titulo">
                Consultas
            </div>
            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-search"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('buscar_miembro')">
                    Buscar miembro
                </div>
            </div>

            <!-- <div class="submenu_titulo">
                Registros
            </div>
            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-database"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('miembros')">
                    Miembros
                </div>
            </div>
            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('pagos')">
                    Ficha miembro
                </div>
            </div> -->
           

            


        </div>


        <div class="cuerpo_seccion_b">
            <div class="top_cuerpo_seccion_b">
                
            </div>
            <div class="cuerpo_sub_seccion_b">
                <!-- <BuscarMiembro v-if="sub_modulo == 'buscar_miembro'" /> -->
                <EntrevistasPendientes v-if="sub_modulo == 'entrevistas_pendientes'" />         
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

// import Miembros from './Registro/Miembros.vue'
// import BuscarMiembro from './Consultas/BuscarMiembro.vue'
import EntrevistasPendientes from './Asignacion/EntrevistasPendientes.vue'

export default {
    components:{
    //    Miembros,
    //    BuscarMiembro,
        EntrevistasPendientes
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
    }
}
</script>

<style>
    
</style>