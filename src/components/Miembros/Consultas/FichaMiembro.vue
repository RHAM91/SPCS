<template>
    <div class="contenedor_modal">
        <!-- <div class="cuerpo_modal"> -->
        <div class="cuerpo_modal_mod_ficha">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" @click="cerrar" size="sm">Cerrar</b-button>
            </div>
            <b-container >
                <b-row>
                    <b-col sm="5" lg="3" class="mt-3">
                        <div class="foto_informacion">
                            <img :src="itemMiembro.foto" style="width: 100%; height: 100%;"  @dblclick="expandirFoto" alt="">
                        </div>
                    </b-col>
                    <b-col sm="7" lg="9" class="mt-3">
                        <div class="informacion_basica">
                            <div class="inombre" style="color: #2a2a2a;">
                                {{itemMiembro.nombre}}
                            </div>
                            <div class="seccion_2">
                                <i class="fas fa-phone-alt"></i> &nbsp;&nbsp; {{itemMiembro.telefono}}
                            </div>
                            <div class="seccion_2">
                                <i class="fas fa-address-card"></i> &nbsp;&nbsp; {{itemMiembro.dpi}}
                            </div>
                            <div class="seccion_2">
                                <i class="fas fa-user-tie"></i> &nbsp;&nbsp; {{itemMiembro.cargo}}
                            </div>
                            <!-- <div class="seccion_2">
                                <i class="fas fa-user-edit" title="Creador"></i> &nbsp;&nbsp; Ingresado por: {{creador}}
                            </div> -->
                            <div class="seccion_2" style="margin-top: 110px;">
                                <b-button size="sm" variant="info" class="mb-2">
                                    <b-icon icon="printer" aria-hidden="true"></b-icon> Imprimir
                                </b-button>
                                <b-button size="sm" variant="warning" style="margin-left: 15px;" class="mb-2" @click="abrirModalCamara">
                                    <b-icon icon="camera" aria-hidden="true"></b-icon> Tomar foto
                                </b-button>
                                <input type="file" id="uploadfile" @change="uploadFile" ref="btnUpload">
                                <b-button size="sm" variant="primary" style="margin-left: 15px;" class="mb-2" @click="subirArchivo">
                                    <b-icon icon="upload" aria-hidden="true"></b-icon> Subir Foto
                                </b-button>
                            </div>
                        </div>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <div class="separador">
                            
                        </div>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <b-tabs content-class="mt-3" >
                            <b-tab title="Información personal" @click="set_submodulo('InformacionGeneral')" active></b-tab>
                            <!-- <b-tab title="Información Iglesia" @click="set_submodulo('InformacionIglesia')"></b-tab>
                            <b-tab title="Información de hijos" @click="set_submodulo('InformacionHijos')"></b-tab> -->
                        </b-tabs>
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'InformacionGeneral'">
                        <InformacionGeneral :iMiembro="itemMiembro" />
                    </b-col>
                    <b-col sm="12" v-if="submodulo == 'InformacionIglesia'">
                        <InformacionIglesia :iMiembro="itemMiembro" />
                    </b-col>
                    <b-col sm="12" v-if="submodulo == 'InformacionHijos'">
                        <InformacionHijos :iMiembro="itemMiembro" />
                    </b-col>
                </b-row>

                <TomarFoto v-if="takefoto" :iMiembro="itemMiembro" v-on:salir="cerrarModalCamara" />
                <FotoGrande v-if="expandir_foto" :iMiembro="itemMiembro.foto" v-on:salir="cerrarModalFotoGrande" />

            </b-container>
        </div>
    </div>
</template>

<script>

import InformacionGeneral from '../Informacion/InformacionGeneral.vue'
import InformacionIglesia from '../Informacion/InformacionIglesia.vue'
import InformacionHijos from '../Informacion/InformacionHijos.vue'
import TomarFoto from './CapturaFoto.vue'
import FotoGrande from './FotoGrande.vue'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'FichaMiembro',
    props:['dpi'],
    components: {
        InformacionGeneral,
        InformacionIglesia,
        InformacionHijos,
        TomarFoto,
        FotoGrande
    },
    data() {
        return {
            submodulo: '',
            takefoto: false,
            expandir_foto: false,
            itemMiembro: {},
            creador: ''
        }
    },
    methods: {
        cerrar(){
            this.$emit('salir')
        },
        async obtenerCreador(){
            let f = await this.getData({api: `usuarios/${this.itemMiembro.quien_creo}`})
            this.creador = `${f.nombre.split(' ')[0]} ${f.apellidos.split(' ')[0]}`
        },
        async obtenerDatos(){
            let f = await this.getData({api: `pastores/${this.dpi}`})
            this.itemMiembro = f
            //await this.obtenerCreador()

        },
        set_submodulo(modulo){
            this.submodulo = modulo
        },
        abrirModalCamara(){
            this.takefoto = true
        },
        cerrarModalCamara(){
            this.takefoto = false
        },
        expandirFoto(){
            this.expandir_foto = true
        },
        subirArchivo(){
            this.$refs.btnUpload.click()
        },
        async uploadFile(event){
            let f = {
                api: 'fotos/archivos',
                evento: event.target.files[0],
                campos: [
                    {
                        campo: 'dpi',
                        payload: this.dpi
                    }
                ]
            }

            await this.sfile(f)
            await this.obtenerDatos()
        },
        cerrarModalFotoGrande(){
            this.expandir_foto = false
        },
        ...mapActions(['sfile', 'getData'])
    },
    mounted() {
        this.obtenerDatos()
    },
}
</script>

<style>

    #uploadfile{
        display: none;
    }


    .primera_informacion{
        width: 100%;
        height: auto;

        display: flex;
    }
        .foto_informacion{
            width: 250px;
            height: 250px;
            border: 1px solid #e6e6e6;
            cursor: pointer;
        }

        @supports(object-fit: cover){
            .foto_informacion img{
                height: 100%;
                object-fit: cover;
                object-position: center center;
            }
        }

        .inombre{
            font-size: 21px;
        }

        .informacion_basica{
            width: 100%;
            height: 150px;
        }

        .seccion_2{
            font-size: 16px;
            color: #6c6c6c;
        }
        
        .separador{
            
            border-bottom: 1px solid #e6e6e6;
        }

    .cuerpo_modal_mod_ficha{
        width: 100%;
        height: 100%;
        background-color: white;

    }
</style>