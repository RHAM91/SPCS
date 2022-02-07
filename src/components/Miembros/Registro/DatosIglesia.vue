<template>
    <div class="marco">

        <b-container fluid="">
            <form @submit.prevent="guardar" @keyup="save_storage">
                <b-row>
                    <b-col sm="6" class="mt-3">
                        <label for="">CUI miembro</label>
                        <b-form-input type="text" id="cuidatosiglesia" v-model="cui" placeholder="F2 para búscar" @keyup.113="abrirModalBuscarMiembro" required size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="6" class="mt-3">
                        <label for="">Nombre del miembro</label>
                        <b-form-input type="text" readonly v-model="nombremiembro" size="sm"></b-form-input>
                    </b-col>
                    <!-- <b-col sm="4" class="mt-3">
                        <label for="">Anciano que entrevistó</label>
                        <select class="form-control form-control-sm" id="seleccionanciano" required v-model="anciano">
                            <option value="">Selecciona</option>
                            <option v-for="(item, index) in ancianos" :key="index" :value="item.id">{{item.anciano}}</option>
                        </select>
                    </b-col> -->
                    <b-col sm="6" class="mt-3">
                        <label for="">Fecha de conversión</label>
                        <b-form-input type="date" v-model="fechaConversion" required size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="6" class="mt-3">
                        <label for="">Lugar de conversión</label>
                        <!-- <b-form-input type="text" v-model="lugar_conversion" required size="sm"></b-form-input> -->
                        <select class="form-control form-control-sm" required v-model="lugar_conversion">
                            <option value="">Selecciona</option>
                            <option value="Iglesia de Jesucristo Palabra Miel Villa Nueva">Iglesia de Jesucristo Palabra Miel Villa Nueva</option>
                            <option value="otros">Otro</option>
                        </select>
                    </b-col>

                    <b-col v-if="lugar_conversion == 'otros'" sm="6" class="mt-3">
                        <label for="">¿Cual fue su congregación anterior?</label>
                        <b-form-input type="text" v-model="congregacionAnterior" size="sm"></b-form-input>
                    </b-col>

                    <b-col v-if="lugar_conversion == 'otros'" sm="6" class="mt-3">
                        <label for="">Motivo de traslado</label>
                        <b-form-input type="text" v-model="motivotraslado" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                        <label for="">¿Es bautizado en agua?</label>
                        <select class="form-control form-control-sm" v-model="pregunta_bautizmo_agua">
                            <option value="">Selecciona</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </b-col>
                    <b-col v-if="pregunta_bautizmo_agua == 1" sm="12" class="mt-3">
                        <label for="">Fecha de bautizmo en agua</label>
                        <b-form-input type="date" v-model="fechaBautizmo" required size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <label for="">¿Es bautizado en Espíritu Santo?</label>
                        <select class="form-control form-control-sm" v-model="pregunta_bautizmo_espiritu">
                            <option value="">Selecciona</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </b-col>
                    <b-col  v-if="pregunta_bautizmo_espiritu == 1"  sm="12" class="mt-3">
                        <label for="">Fecha de bautizmo en Espíritu Santo</label>
                        <b-form-input type="date" v-model="fechaBautizmoEspiritu" required size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="6" class="mt-3">
                        <label for="">¿Quienes son convertidos en su hogar?</label>
                        <b-form-input type="text" v-model="pregunta_convertidos_hogar" placeholder="Separar por comas" required size="sm"></b-form-input>
                    </b-col>
                    

                    <b-col sm="6" class="mt-3">
                        <label for="">¿Se discipula?</label>
                        <select class="form-control form-control-sm" required v-model="sediscipula">
                            <option value="">Selecciona</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </b-col>
                    <b-col  v-if="sediscipula == 0 && sediscipula != ''"  sm="12" class="mt-3">
                        <label for="">¿Desea Discipularse?</label>
                        <select class="form-control form-control-sm" required v-model="afirmacionsediscipula">
                            <option value="">Selecciona</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </b-col>
                    <b-col sm="6" class="mt-3">
                        <label for="">Fecha en la que empezó a a asistir a la iglesia</label>
                        <b-form-input type="date" v-model="fechaAsistenciaIglesia" required size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="6" class="mt-3">
                        <label for="">¿Tiene carta de recomendación?</label>
                        <select class="form-control form-control-sm" v-model="cartarecomendacion">
                            <option value="">Selecciona</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                        <label for="">¿Tiene familia en la congregación?</label>
                        <select class="form-control form-control-sm" v-model="conocidos_congregandose">
                            <option value="">Selecciona</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </b-col>
                    
                    <b-col  v-if="conocidos_congregandose == 1"  sm="12" class="mt-3">
                        <label for="">¿Quienes son?</label>
                        <b-form-input type="text" v-model="quienes_conocidos_se_congregan" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="mt-3">
                        <label for="">En caso de tener una necesidad. ¿Desea que lo visiten?</label>
                        <select class="form-control form-control-sm" v-model="pregunta_en_caso_necesidad">
                            <option value="">Selecciona</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </b-col>
                    <b-col sm="4" class="mt-3">
                        <label for="">¿Labora actualmente?</label>
                        <select class="form-control form-control-sm" v-model="labora">
                            <option value="">Selecciona</option>
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </b-col>
                    <b-col sm="4" class="mt-3">
                        <label for="">Anciano (otros)</label>
                        <b-form-input type="text" v-model="anciano_otros" placeholder="Opcional" size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <label for="">Comentarios del entrevistador</label>
                        <b-form-input type="text" v-model="comentarios" required size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                        <b-button type="submit" variant="success" size="sm">Guardar</b-button>
                    </b-col>
                </b-row>
            </form>

            <BuscarMiembro v-if="modalBuscarMiembro" v-on:salir="cerrarModalBuscarMiembro" v-on:seleccion="insertarDato" />

        </b-container>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import BuscarMiembro from './BuscarMiembro.vue'

export default {
    name: 'DatosIglesia',
    computed: {
        ...mapState(['ancianos', 'datos_iglesia'])
    },
    components:{
        BuscarMiembro
    },
    data() {
        return {
            modalBuscarMiembro: false,
            nombremiembro: '',

            cui: '',
            anciano: '',
            fechaConversion: '',
            lugar_conversion: 'Iglesia de Jesucristo Palabra Miel Villa Nueva',
            pregunta_bautizmo_agua: '',
            fechaBautizmo: '',
            pregunta_bautizmo_espiritu: '',
            fechaBautizmoEspiritu: '',
            pregunta_convertidos_hogar: '',
            congregacionAnterior: '',
            sediscipula: "",
            afirmacionsediscipula: '',
            fechaAsistenciaIglesia: '',
            cartarecomendacion: '',
            conocidos_congregandose: '',
            quienes_conocidos_se_congregan: '',
            motivotraslado: '',
            pregunta_en_caso_necesidad: '',
            labora: '',
            anciano_otros: '',
            comentarios: ''
        }
    },
    methods: {
        async guardar(){
            let d = {
                api: 'miembros/datosiglesia',
                pull: false,
                formulario: {
                    dpi: this.cui,
                    ancianoentrevisto: this.anciano,
                    fechaconversion: this.fechaConversion,
                    lugardeconversion: this.lugar_conversion,
                    bautizmoagua: this.pregunta_bautizmo_agua,
                    fechabautizmoagua: this.fechaBautizmo == '' ? null : this.fechaBautizmo,
                    bautizmoespiritu: this.pregunta_bautizmo_espiritu,
                    fechabautizmoespiritu: this.fechaBautizmoEspiritu == '' ? null: this.fechaBautizmoEspiritu,
                    personasconvertidashogar: this.pregunta_convertidos_hogar,
                    congregacionanterior: this.congregacionAnterior,
                    discipula: this.sediscipula,
                    deseadisipularse: this.afirmacionsediscipula == '' ? null : this.afirmacionsediscipula,
                    fechaasistenciaiglesia: this.fechaAsistenciaIglesia,
                    cartarecomendacion: this.cartarecomendacion,
                    conocidos_congregandose: this.conocidos_congregandose,
                    quienes_conocidos_se_congregan: this.quienes_conocidos_se_congregan,
                    motivotraslado: this.motivotraslado,
                    visita: this.pregunta_en_caso_necesidad,
                    laboraactualmente: this.labora,
                    anciano_otros: this.anciano_otros,
                    comentarios: this.comentarios
                }
            }

            //await this.saveData(d)

            this.cui = ''
            this.nombremiembro = ''
            this.anciano = ''
            this.fechaConversion = ''
            this.lugar_conversion = ''
            this.pregunta_bautizmo_agua = ''
            this.fechaBautizmo = ''
            this.pregunta_bautizmo_espiritu = ''
            this.fechaBautizmoEspiritu = ''
            this.pregunta_convertidos_hogar = ''
            this.congregacionAnterior = ''
            this.sediscipula = ''
            this.afirmacionsediscipula = ''
            this.fechaAsistenciaIglesia = ''
            this.cartarecomendacion = ''
            this.conocidos_congregandose = ''
            this.quienes_conocidos_se_congregan = ''
            this.motivotraslado = ''
            this.pregunta_en_caso_necesidad = ''
            this.labora = ''
            this.anciano_otros = ''
            this.comentarios = ''

            document.getElementById('cuidatosiglesia').focus()
            this.set_datos_iglesia('')
            this.$emit('comprobacion', 'modulo_2')

        },
        cerrarModalBuscarMiembro(){
            this.modalBuscarMiembro = false
        },
        abrirModalBuscarMiembro(){
            this.modalBuscarMiembro = true
        },
        insertarDato(i){
            this.cui = i.dpi
            this.nombremiembro = i.nombre
            //document.getElementById('seleccionanciano').focus()
        },
        save_storage(){

            let info = {
                cui: this.cui,
                nombremiembro: this.nombremiembro,
                anciano: this.anciano,
                fechaConversion: this.fechaConversion,
                lugar_conversion: this.lugar_conversion,
                pregunta_bautizmo_agua: this.pregunta_bautizmo_agua,
                fechaBautizmo: this.fechaBautizmo,
                pregunta_bautizmo_espiritu: this.pregunta_bautizmo_espiritu,
                fechaBautizmoEspiritu: this.fechaBautizmoEspiritu,
                pregunta_convertidos_hogar: this.pregunta_convertidos_hogar,
                congregacionAnterior: this.congregacionAnterior,
                sediscipula: this.sediscipula,
                afirmacionsediscipula: this.afirmacionsediscipula,
                fechaAsistenciaIglesia: this.fechaAsistenciaIglesia,
                cartarecomendacion: this.cartarecomendacion,
                conocidos_congregandose: this.conocidos_congregandose,
                quienes_conocidos_se_congregan: this.quienes_conocidos_se_congregan,
                motivotraslado: this.motivotraslado,
                pregunta_en_caso_necesidad: this.pregunta_en_caso_necesidad,
                labora: this.labora,
                anciano_otros: this.anciano_otros,
                comentarios: this.comentarios
            }

            let cadena = JSON.stringify(info)
            this.set_datos_iglesia(cadena)

        },
        restore_data(){
            if (this.datos_iglesia != '') {               
                let r = JSON.parse(this.datos_iglesia)
                
                this.cui = r.cui
                this.nombremiembro = r.nombremiembro
                this.anciano = r.anciano
                this.fechaConversion = r.fechaConversion
                this.lugar_conversion = r.lugar_conversion
                this.pregunta_bautizmo_agua = r.pregunta_bautizmo_agua
                this.fechaBautizmo = r.fechaBautizmo
                this.pregunta_bautizmo_espiritu = r.pregunta_bautizmo_espiritu
                this.fechaBautizmoEspiritu = r.fechaBautizmoEspiritu
                this.pregunta_convertidos_hogar = r.pregunta_convertidos_hogar
                this.congregacionAnterior = r.congregacionAnterior
                this.sediscipula = r.sediscipula
                this.afirmacionsediscipula = r.afirmacionsediscipula
                this.fechaAsistenciaIglesia = r.fechaAsistenciaIglesia
                this.cartarecomendacion = r.cartarecomendacion
                this.conocidos_congregandose = r.conocidos_congregandose
                this.quienes_conocidos_se_congregan = r.quienes_conocidos_se_congregan
                this.motivotraslado = r.motivotraslado
                this.pregunta_en_caso_necesidad = r.pregunta_en_caso_necesidad
                this.labora = r.labora
                this.anciano_otros = r.anciano_otros
                this.comentarios = r.comentarios
            }


        },
        ...mapActions(['saveData']),
        ...mapMutations(['set_datos_iglesia'])
    },
    mounted() {
        document.getElementById('cuidatosiglesia').focus()
        this.restore_data()
    },
}
</script>

<style>
    
</style>