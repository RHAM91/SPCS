<template>
    <div class="marco">
        <b-container fluid="">
            <form @submit.prevent="guardar" @keyup="save_storage">
                <b-row>
                    <b-col sm="3" class="mt-3">
                        <label for="">CUI / DPI</label>
                        <b-form-input type="text" id="cui" v-model="cui" required autocomplete="off" @change="desactivacion" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="6" class="mt-3">
                        <label for="">Nombre completo</label>
                        <b-form-input type="text" v-model="nombre" required autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="3" class="mt-3">
                        <label for="">Género</label>
                        <select class="form-control form-control-sm" v-model="genero" required>
                            <option value="">Selecciona</option>
                            <option value="M">Másculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                        <label for="">Dirección</label>
                        <b-form-input type="text" v-model="direccion" required autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="mt-3">
                        <label for="">Teléfono Casa</label>
                        <b-form-input type="text" v-model="telefono" required autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="mt-3">
                        <label for="">Teléfono Móvil</label>
                        <b-form-input type="text" v-model="telefono_movil" placeholder="Opcional" autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="mt-3">
                        <label for="">Teléfono Trabajo</label>
                        <b-form-input type="text" v-model="telefono_trabajo" placeholder="Opcional" autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="mt-3">
                        <label for="">Correo Electrónico</label>
                        <b-form-input type="text" v-model="correo" autocomplete="off" size="sm"></b-form-input>
                    </b-col>


                    <b-col sm="4" class="mt-3">
                        <label for="">Fecha de nacimiento</label>
                        <b-form-input type="date" v-model="fechaNacimiento" required autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <!-- <b-col sm="12" class="mt-3">
                        <label for="">Status</label>
                        <select class="form-control form-control-sm" v-model="status" @change="MostrarFechaFallecimiento">
                            <option value="">Selecciona</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                            <option value="Fallecido">Fallecido</option>
                        </select>
                    </b-col> -->

                    <b-col sm="12" class="mt-3" v-if="mostrarCampoFechaFallecimiento">
                        <label for="">Fecha fallecimiento</label>
                        <b-form-input type="date" v-model="fechaFallecimiento" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="mt-3">
                        <label for="">Estado civil</label>
                        <select class="form-control form-control-sm" v-model="estadocivilx">
                            <option value="">Selecciona</option>
                            <option v-for="(item, index) in estadocivil" :key="index" :value="item.estado">{{item.estado}}</option>
                        </select>
                    </b-col>

                    <b-col sm="6" class="mt-3">
                        <label for="">Profesión</label>
                        <select class="form-control form-control-sm" v-model="profesion">
                            <option value="">Selecciona</option>
                            <option v-for="(item, index) in profesiones" :key="index" :value="item.id">{{item.profesion}}</option>
                        </select>
                    </b-col>

                    <b-col sm="6" class="mt-3">
                        <label for="">Ocupación actual</label>
                        <b-form-input type="text" v-model="ocupacionActual" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="mt-3">
                        <label for="">Nombre del cónyuge</label>
                        <b-form-input type="text" v-model="conyugue" size="sm"></b-form-input>
                    </b-col>
                   
                    <b-col sm="4" class="mt-3">
                        <label for="">Teléfono Cónyuge</label>
                        <b-form-input type="text" v-model="telefono_conyuge"  autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="mt-3">
                        <label for="">Número de hijos</label>
                        <b-form-input type="number" v-model="noHijos" size="sm"></b-form-input>
                    </b-col>


                    <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                        <b-button type="submit" size="sm" variant="success">Guardar</b-button>
                    </b-col>

                </b-row>
            </form>
        </b-container>

    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'


export default {
    name: 'InformacionGeneral',
    computed:{
        ...mapState(['profesiones', 'estadocivil', 'datos_personales'])
    },
    data() {
        return {
            mostrarCampoFechaFallecimiento: false,
            cui: '',
            nombre: '',
            genero: '',
            direccion: '',
            telefono: '',
            telefono_movil: '',
            telefono_trabajo: '',
            correo: '',
            fechaNacimiento: '',
            fechaFallecimiento: '',
            estadocivilx: '',
            profesion: '',
            ocupacionActual: '',
            conyugue: '',
            telefono_conyuge: '',
            noHijos: ''
            
        }
    },
    methods: {
        MostrarFechaFallecimiento(){
            if (this.status == 'Fallecido') {
                this.mostrarCampoFechaFallecimiento = true
            }else{
                this.mostrarCampoFechaFallecimiento = false
            }
        },
        async guardar(){
            let f = {
                api: 'miembros',
                pull: false,
                formulario: {
                    dpi: this.cui,
                    nombre: this.nombre.toUpperCase(),
                    direccion: this.direccion.toUpperCase(),
                    telefono: this.telefono,
                    telefono_movil: this.telefono_movil,
                    telefono_trabajo: this.telefono_trabajo,
                    correo: this.correo,
                    fechadenacimiento: this.fechaNacimiento,
                    genero: this.genero,
                    estado: 'Activo',
                    fechadefallecimiento: this.fechaFallecimiento == '' ? null: this.fechaFallecimiento,
                    estadocivil: this.estadocivilx,
                    profesion: this.profesion,
                    ocupacion: this.ocupacionActual.toUpperCase(),
                    conyuge: this.conyugue == '' ? 'N/A': this.conyugue.toUpperCase(),
                    telefono_conyuge: this.telefono_conyuge,
                    nohijos: this.noHijos == '' ? 0: this.noHijos
                }
            }

            await this.saveData(f)
            await this.pullData({api: 'entrevistas'})

                this.cui = ''
                this.nombre = ''
                this.direccion = ''
                this.telefono = ''
                this.telefono_movil = ''
                this.telefono_trabajo = ''
                this.correo = ''
                this.fechaNacimiento = ''
                this.status = ''
                this.fechaFallecimiento = ''
                this.genero = ''
                this.estadocivilx = ''
                this.profesion = ''
                this.ocupacionActual = ''
                this.conyugue = ''
                this.telefono_conyuge = ''
                this.noHijos = ''

                this.set_datos_personales('')
                this.$emit('comprobacion', 'modulo_1')

            
        },
        save_storage(){

            let info = {
                cui: this.cui,
                nombre: this.nombre,
                direccion: this.direccion,
                telefono: this.telefono,
                telefono_movil: this.telefono_movil,
                telefono_trabajo: this.telefono_trabajo,
                correo: this.correo,
                fechaNacimiento: this.fechaNacimiento,
                genero: this.genero,
                fechaFallecimiento: this.fechaFallecimiento,
                estadocivilx: this.estadocivilx,
                profesion: this.profesion,
                ocupacionActual: this.ocupacionActual,
                conyugue: this.conyugue,
                telefono_conyuge: this.telefono_conyuge,
                noHijos: this.noHijos
            }

            let cadena = JSON.stringify(info)
            this.set_datos_personales(cadena)

        },
        restore_data(){
            if (this.datos_personales != '') {               
                let r = JSON.parse(this.datos_personales)
                
                this.cui = r.cui,
                this.nombre = r.nombre,
                this.direccion = r.direccion,
                this.telefono = r.telefono,
                this.telefono_movil = r.telefono_movil,
                this.telefono_trabajo = r.telefono_trabajo,
                this.correo = r.correo,
                this.fechaNacimiento = r.fechaNacimiento,
                this.genero = r.genero,
                this.fechaFallecimiento = r.fechaFallecimiento,
                this.estadocivilx = r.estadocivilx,
                this.profesion = r.profesion,
                this.ocupacionActual = r.ocupacionActual,
                this.conyugue = r.conyugue,
                this.telefono_conyuge = r.telefono_conyuge
                this.noHijos = r.noHijos
            }


        },
        desactivacion(){
            this.$emit('desactivar')
        },
        ...mapActions(['saveData', 'pullData']),
        ...mapMutations(['set_datos_personales'])
    },
    mounted() {
        document.getElementById('cui').focus()
        this.restore_data()
    }
}
</script>

<style>

</style>