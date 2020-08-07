const router=require('express').Router();
const {
addSubject,
getAllSubjects,
getSubjectById,
updateSubject,
deleteSubject
}=require('./subject.controller');


router.post('/',addSubject)
router.get('/',getAllSubjects)
router.get('/:id',getSubjectById)
router.patch('/',updateSubject)
router.delete('/',deleteSubject)



module.exports=router;