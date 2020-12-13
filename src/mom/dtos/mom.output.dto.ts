import { Mom } from "../mom.model"
import { Sitter } from "src/sitter/sitter.model"

export class RegisterOutputDTO {
    ok!: boolean
    mom!: Mom
}

export class GetSitterOutputDTO {
    ok!: boolean
    sitters!: Sitter[]
}