using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace API_Restore.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next; // ส่งผ่านคำขอไปยัง middleware ถัดไปใน pipeline
        private readonly ILogger<ExceptionMiddleware> _logger; // ใช้ในการบันทึกข้อผิดพลาด
        private readonly IHostEnvironment _env; // สามารถกำหนดค่าต่างๆ ตามสภาพแวดล้อม
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env) 
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context); // ส่งคำขอ HTTP ไปยัง middleware ถัดไปใน pipeline ผ่าน _next(context)
            } catch (Exception e) // ถ้าเกิดข้อยกเว้นระหว่างการดำเนินการของคำขอ, ข้อยกเว้นนั้นจะถูกจับและดำเนินการภายในส่วนนี้
            {
                _logger.LogError(e, e.Message); // บันทึกข้อผิดพลาดลงใน log 
                context.Response.ContentType = "application/json"; // การตอบกลับจากเซิร์ฟเวอร์จะอยู่ในรูปแบบ JSON
                context.Response.StatusCode = 500; // สถานะของการตอบกลับจะถูกตั้งค่าเป็น 500 มีข้อผิดพลาดในเซิร์ฟเวอร์

                var response = new ProblemDetails
                {
                    Status = 500, // แสดงสถานะ 500
                    Detail = _env.IsDevelopment() ? e.StackTrace?.ToString() : null,
                    Title = e.Message, //แสดงข้อความที่บันทึก
                };

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, options); // แปลงจาก ProblemDetails เป็น json

                await context.Response.WriteAsync(json); // เขียนการตอบกลับ ส่งกลับไปยังผู้ใช้ที่ทำการร้องขอ
            }
        }
    }
}
