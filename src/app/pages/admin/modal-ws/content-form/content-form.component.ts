import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AlertService } from "src/app/services/shared/alert.service";
import { AuthService } from "src/app/services/auth.service";
import { Content } from "@angular/compiler/src/render3/r3_ast";

@Component({
  selector: "app-content-form",
  templateUrl: "./content-form.component.html",
  styleUrls: ["./content-form.component.scss"],
})
export class ContentFormComponent implements OnInit {
  @Input() editing: Boolean;
  @Input() content: any = { type: "1" };

  @Output() saveContent = new EventEmitter<{}>();

  contentForm: FormGroup;

  validation_messages = {
    title: [
      { type: "required", message: "El Titulo es requerido" },
      {
        type: "minlength",
        message: "El titulo debe contener al menos una palabra",
      },
    ],
    url: [{ type: "required", message: "La url es requerida" }],
  };
  constructor(
    private alertService: AlertService,
    private auths: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.contentForm = this.formBuilder.group({
      title: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      url: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    if (this.editing) {
      this.contentForm.patchValue({
        title: this.content.title,
        url: this.content.url,
      });
    } else {
    }
  }

}
