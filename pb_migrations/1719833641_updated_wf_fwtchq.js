/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p37e9rf927go5wc")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id,wf.id as wfid,wf.wfname,wfa.id as wfaid ,wfa.app_order from workflow as wf  join workflow_app as wfa ON wf.id=wfa.wf_id WHERE wf.user_id='3q8gebiwxes5hxo'"
  }

  // remove
  collection.schema.removeField("spbsqygl")

  // remove
  collection.schema.removeField("8h3ar4g7")

  // remove
  collection.schema.removeField("ynmrnrkt")

  // remove
  collection.schema.removeField("ii90rki7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yynschi9",
    "name": "wfid",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "k4aqc9j77xx9p02",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ivmxposi",
    "name": "wfname",
    "type": "text",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5u19unca",
    "name": "wfaid",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "odjq6hyswwnkalf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jtbwcs1z",
    "name": "app_order",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p37e9rf927go5wc")

  collection.options = {
    "query": "SELECT (ROW_NUMBER() OVER()) as id,wf.id as wfid,wf.wfname,wfa.id as wfaid ,wfa.app_order from workflow as wf  join workflow_app as wfa WHERE wf.user_id='3q8gebiwxes5hxo'"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "spbsqygl",
    "name": "wfid",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "k4aqc9j77xx9p02",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8h3ar4g7",
    "name": "wfname",
    "type": "text",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ynmrnrkt",
    "name": "wfaid",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "odjq6hyswwnkalf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ii90rki7",
    "name": "app_order",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("yynschi9")

  // remove
  collection.schema.removeField("ivmxposi")

  // remove
  collection.schema.removeField("5u19unca")

  // remove
  collection.schema.removeField("jtbwcs1z")

  return dao.saveCollection(collection)
})