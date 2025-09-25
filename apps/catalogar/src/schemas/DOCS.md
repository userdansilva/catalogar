# Padrões de Schema

#### 1. Ao criar um schema deve ser criado um objeto central (sem o sufixo `Schema`) com todos os campos, os schemas serão derivados dele.

#### 2. Adições de campos no objeto central nunca devem afetar os schemas:

- Ao criar schemas deve usar o `.pick()` ao invés de `.omit()`, pois com o `.omit()` caso o objeto central for modificado, os schemas derivados dele iriam herdar essas moficações de forma implícita, resultando falha de validação indesejada. Através do `.pick()` você consegue definir, de forma explícita, que o schema vai ter apenas os campos definidos.

- Schemas nunca devem ser instanciados apartir do objeto central, pois seram afetados por modificações no objeto central.

#### 3. Objetos centrais não devem ser exportados.
