using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Restore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")] //ไม่พบทรัพยากรที่ร้องขอ
        public ActionResult GetNotFound()
        {
            return NotFound();
        }
        
        [HttpGet("bad-request")] //การส่งคืนข้อผิดพลาดใน HTTP APIs
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails {Title = "This is a bad request"});
        }

        [HttpGet("unauthorised")] //ไม่ได้รับอนุญาติ
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }

        // ถูกใช้เพื่อส่งคืนรหัสสถานะ 400 พร้อมการตอบกลับ ProblemDetails
        // ที่รวมถึงข้อผิดพลาดในการตรวจสอบความถูกต้อง 
        // ModelState ใช้ในการเพิ่มข้อผิดพลาดที่อธิบายว่าสิ่งใดผิดพลาด
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "This is the first error");
            ModelState.AddModelError("Problem2", "This is the second error");

            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }
    }
}
