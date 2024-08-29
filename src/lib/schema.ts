// src/db/schema.js
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const cartasTarot = pgTable("tarot_de_thot", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  número_significado: text("número_significado").notNull(),
  descrição_curta: text("descrição_curta").notNull(),
  descrição_longa: text("descrição_longa"),
  url_da_imagem: text("url_da_imagem"),
  planeta_governante: text("planeta_governante"),
  zodíaco: text("zodíaco"),
  árvore_da_vida: text("árvore_da_vida"),
  atributos: text("atributos").array(),
  elemento: text("elemento"),
  significados_positivos: text("significados_positivos").array(),
  significados_negativos: text("significados_negativos").array(),
  significado_reverso: text("significado_reverso"),
  conselho: text("conselho"),
  pergunta: text("pergunta"),
  confirmação: text("confirmação"),
  determinação: text("determinação").array(),
  palavras_chave: text("palavras_chave").array(),
  revelação: text("revelação"),
});
