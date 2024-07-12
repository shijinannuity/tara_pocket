/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4zy80prc6gzsvd")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id,company from notloggedfor20 as t1 WHERE  (select json_group_array(name) as names FROM notloggedfor20 as t2 WHERE t2.company=t1.company)=(SELECT json_group_array(name) as names from users where users.company_id=(SELECT id from company WHERE company.company_name=t1.company)) GROUP by company"
  }

  // remove
  collection.schema.removeField("sl7zx4hb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kh9oywpu",
    "name": "company",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4zy80prc6gzsvd")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id,company from notloggedfor20 as t1 WHERE  (select json_group_array(name) as names FROM notloggedfor20 as t2 WHERE t2.company=t1.company)=(SELECT json_group_array(name) as names from users where users.company_id=(SELECT id from company WHERE company.company_name=t1.company)) "
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sl7zx4hb",
    "name": "company",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("kh9oywpu")

  return dao.saveCollection(collection)
})