import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormUsuarioComponent } from '../form-usuario/form-usuario.component';
import { BtnVoltarComponent } from '../../../shared/components/btn-voltar/btn-voltar.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';
import { BtnNovoComponent } from '../../../shared/components/btn-novo/btn-novo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormGrupoComponent } from '../modal-form-grupo/modal-form-grupo.component';
import { DataService } from '../../../shared/services/data-service';
import { Avatar } from '../../../core/models/avatar.interface';
import { Usuario } from '../../../core/models/usuario.interface';
import { ImageCompressorService } from '../../../shared/services/image-compressor.service';

@Component({
  selector: 'app-edicao-usuarios',
  standalone: true,
  imports: [FormUsuarioComponent, BtnVoltarComponent, NgxSpinnerModule, HasRoleDirective, BtnNovoComponent],
  templateUrl: './edicao-usuarios.component.html',
  styleUrl: './edicao-usuarios.component.css'
})
export class EdicaoUsuariosComponent implements OnInit {

  usuarioId!: number;
  avatar!: Avatar;
  private modalService = inject(NgbModal);
  @ViewChild(FormUsuarioComponent) formUsuario!: FormUsuarioComponent;

  constructor(private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService, private usuarioService: UsuariosService, private toastr: ToastrService,
    private dataService: DataService , private router: Router, private imageCompressorService: ImageCompressorService
  ){}

  ngOnInit(): void {
    this.usuarioId = this.activatedRoute.snapshot.params['id'];
  }
  
  async submit(event: Usuario){
    this.spinner.show();
    event.id = this.usuarioId;
    this.avatar = event.avatar;
    if(event.avatar && event.avatar.file){
      const compressedFile = await this.imageCompressorService.compressImage(this.avatar.file, 800, 800, 0.8);
      const compressedFileObj = new File([compressedFile], this.avatar.file.name, {
        type: this.avatar.file.type,
        lastModified: Date.now()
      });
      this.dataService.pushFileToStorage(compressedFileObj, "avatars").subscribe({
        next: (res) => {
          this.avatar.url = res.url;
          this.avatar.path = res.path;
          this.editarUsuario(event);
        }
      })
      return;
    }
    this.editarUsuario(event);
    
  }

  async editarUsuario(event: any){
    this.usuarioService.updateUsuario(event).subscribe({
      next: () => {
        this.toastr.success('Usuário atualizado!', 'Sucesso');
        this.router.navigateByUrl('/app/usuarios');
      },
      error: async () => {
        if(event.avatar && event.avatar.file){
          await this.deleteFile();
        }
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  async deleteFile(){
      await this.dataService.deleteFile(this.avatar.path!);
  }

  openNovoGrupo() {
		const modalRef = this.modalService.open(ModalFormGrupoComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.submitEvent.subscribe((e: any) => {
      this.formUsuario.getGrupos(null);
    });
	}
}
