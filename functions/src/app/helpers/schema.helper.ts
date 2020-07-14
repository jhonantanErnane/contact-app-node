import { CollectionModel } from "../models/interface.model";

export class ValidateResult<T> {
  hasError: boolean;
  model: T;
  erros: []
}

export class SchemaHelper {

  entity: Object | any;

  constructor(entity) {
    if(!entity){
      throw new Error('A schema não pode ser nula.')
    }
    this.entity = entity;
  }

  isReservedAttribute(key) {
    return  key === 'index' || key === '__v' || key === 'id' || key === 'uid';
  }

  validateUpdate(entityEntry: CollectionModel) {
    const check: any = {
      hasError: false,
      model: {},
      erros: []
    };

  
    Object.keys(entityEntry)
      .forEach(key => {
        if(this.entity[key]) {

          const baseAttribute = this.entity[key];
          let entryAttribute = entityEntry[key];

          if(baseAttribute.auto && baseAttribute.onUpdate) {
            entryAttribute = new Date();
          }

          if(baseAttribute.default || baseAttribute.default === 0 || baseAttribute.default === false) {
            if(!entryAttribute && entryAttribute !== 0 && entryAttribute !== false) {
              entryAttribute = baseAttribute.default;
            } 
          }
          if(baseAttribute.enum || baseAttribute.enum === 0 || baseAttribute.enum === false) {
            const index = baseAttribute.enum.indexOf(entryAttribute);
            if(index < 0) {
              check.hasError = true;
              check.erros.push({
                field: key,
                message: `Valores devem ser entre [${baseAttribute.enum.join(', ')}]`
              });
            }
          }

          if(baseAttribute.required) {
            if(!entryAttribute && entryAttribute !== 0 && entryAttribute !== '' && entryAttribute !== false) {
              check.hasError = true
              check.erros.push({
                field: key,
                message: Array.isArray(baseAttribute.required) ? baseAttribute.required[1] : `O campo ${key} é obrigatório`
              });
            }
          }

          if(entryAttribute === undefined || entryAttribute === NaN || entryAttribute === null) {
            check.hasError = true
              check.erros.push({
                field: key,
                message: `O campo ${key} não pode ter valores como (undefined, NaN, null)`
              });
          }


        } else if(this.isReservedAttribute(key)) {
          check.model[key] = entityEntry[key];
        } else {
          check.hasError = true;
          check.erros.push({
            field: key,
            message: `O campo ${key} não existe`
          });
        }
      });

    if(check.model.__v >= 0) {
      check.model.__v++
    } else {
      check.model.__v = 0;
    }
  

    return check;
  }

  validateSave(entityEntry: CollectionModel) {
    const check: any = {
      hasError: false,
      model: {},
      erros: []
    };

    if(!entityEntry) {
      throw new Error("The entity cannot be null or empty.");
    }

    Object.keys(this.entity)
      .forEach(key => {
        const baseAttribute = this.entity[key];
        let entryAttribute = entityEntry[key];

        if(baseAttribute.auto) {
          entryAttribute = new Date();
        }

        if(baseAttribute.default || baseAttribute.default === 0 || baseAttribute.default === false) {
          if(!entryAttribute && entryAttribute !== 0 && entryAttribute !== false) {
            entryAttribute = baseAttribute.default;
          } 
        }
        if(baseAttribute.enum || baseAttribute.enum === 0 || baseAttribute.enum === false) {
          const index = baseAttribute.enum.indexOf(entryAttribute);
          if(index < 0) {
            check.hasError = true;
            check.erros.push({
              field: key,
              message: `Os valores devem ser entre [${baseAttribute.enum.join(', ')}]`
            })
          }
        }

        if(baseAttribute.required) {
          if(!entryAttribute && entryAttribute !== 0 && entryAttribute !== '' && entryAttribute !== false) {
            check.hasError = true;
            check.erros.push({
              field: key,
              message: Array.isArray(baseAttribute.required) ? baseAttribute.required[1] : `O campo ${key} é obrigatório`
            });
          }
        }
        if(entryAttribute || entryAttribute === 0 || entryAttribute === false){
          check.model[key] = entryAttribute;
        }
      });

    if(check.model.__v >= 0) {
      check.model.__v++
    } else {
      check.model.__v = 0;
    }

    return check;
  }
}