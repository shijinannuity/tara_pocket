/// <reference path="../pb_data/types.d.ts" />

/*
[{
            "wf_row_id": "wifbyq34piqbjtu",
            "wf_name": "rtr",
            "user_id": "7nzws8mbrzpxpsl",
            "description": "sgfs",
            "isactive": false,
            "wf_apps": [
                {
                    "app": {
                        "app_id": "ar_10",
                        "company_id": "wdyfaxu24v587e1",
                        "internalport": 12121,
                        "internalurl": "SliderInput",
                        "logo": "2TjqXXHyqpb_AyULBggn0S.png",
                        "name": "SliderInput",
                        "table_id": "gao818var23eol9"
                    },
                    "app_order": 1,
                    "wf_app_row_id": "r635f4b3ddc31da"
                }
            ]
        }
]*/

onRecordBeforeUpdateRequest((e)=>{
    try{
        let oldrecord=e.record.originalCopy()
        let record=e.record
        let id=record.getId()
        let oldapplist=oldrecord.get("apps")
        let newapplist=record.get("apps")
        let removedapps=[];
        oldapplist.forEach((element)=>{
            if(newapplist.indexOf(element)==-1){
                removedapps.push(element)
            }
        })

        if(removedapps.length>0){
            console.log(`removed apps:: ${removedapps}`)
            const result = arrayOf(
                new DynamicModel({
                    wf_row_id: "",
                    wf_name: "",
                    user_id: "",
                    description: "",
                    isactive: true,
                    wf_apps: [
                        /*{
                            id:"",
                            app_order:0,
                            app_id:""
                        }*/
                    ]
                }))
            $app.dao().db().newQuery("SELECT wf.id as wf_row_id,wf.wfname as wf_name,wf.user_id,wf.description,wf.isactive,( SELECT json_group_array( json_object('wf_app_row_id', workflow_app.id,'app_order', workflow_app.app_order, 'app', (SELECT json_object('table_id',apps.id,'app_id',apps.app_id,'name',apps.name,'logo',apps.file,'internalurl',apps.internalurl,'internalport',apps.internalport,'company_id',apps.company_id) FROM apps WHERE apps.id = workflow_app.app ))) FROM workflow_app WHERE workflow_app.wf_id = wf.id ORDER BY workflow_app.app_order) as wf_apps FROM workflow as wf WHERE wf.user_id = {:uid} ORDER BY -wf.isactive,-wf.updated").bind({ "uid": id }).all(result)
            let removeWfapps=[]
            result.forEach((element)=>{
                element["wf_apps"].forEach((val,index)=>{
                    if(removedapps.indexOf(val["app"]["table_id"])!=-1){
                        removeWfapps.push(`'${val["wf_app_row_id"]}'`)
                    }
                })
            })
           
            // recent
            let user_id=record.get("user_id")
            // SELECT ac.id from access as ac join apps as ap on ac.event=ap.app_id where  user='ar_shiji' AND ap.id in ('8dl1q2gymdbjmqj')
            // SELECT ac.id from access as ac where user='ar_shiji' AND ac.event in (SELECT apps.app_id FROM apps WHERE apps.id in ('8dl1q2gymdbjmqj'))`
            $app.dao().runInTransaction((txDao) => {
                let query=`DELETE FROM workflow_app where workflow_app.id in (${removeWfapps})`
                console.log(`query wf ::: ${query}`)
                removedapps=removedapps.map((val)=>`'${val}'`)
                console.log(`after removedapps ::: ${removedapps}`)
                txDao.db().newQuery(query).execute()
                console.log(`after query wf`)
                query=`DELETE FROM access where user='${user_id}' AND event in (SELECT apps.app_id FROM apps WHERE apps.id in (${removedapps}))`
                txDao.db().newQuery(query).execute()
                query=`DELETE from alert  where owner='${id}' and app in (SELECT apps.name from apps where apps.id in (${removedapps}))`
                txDao.db().newQuery(query).execute()
                query=`DELETE from reminder where owner_user_id='${id}' and app in (SELECT apps.name from apps where apps.id in (${removedapps}))`
                txDao.db().newQuery(query).execute()
            })
            /*query=`DELETE FROM access where user='${user_id}' AND ac.event in (SELECT apps.app_id FROM apps WHERE apps.id in (${removedapps}))`
            $app.dao().db().newQuery(query).execute()
            query=`DELETE from alert  where owner='${id}' and app in (SELECT apps.name from apps where apps.id in (${removedapps}))`
            $app.dao().db().newQuery(query).execute()
            query=`DELETE from reminder where owner_user_id='${id}' and a.app in (SELECT apps.name from apps where apps.id in (${removedapps}))`
            $app.dao().db().newQuery(query).execute()*/
            //  SELECT a.id,a.app from reminder as a where a.owner_user_id='7nzws8mbrzpxpsl' and a.app in (SELECT apps.name from apps where apps.id in ('8dl1q2gymdbjmqj'))
            // SELECT a.id,a.app from alert as a where a.owner='7nzws8mbrzpxpsl' and a.app in (SELECT apps.name from apps where apps.id in ('8dl1q2gymdbjmqj'))
             


            
    }
    }catch(e){
        console.log(`Error in applistchange::: ${e}`)
    }

},"users")
