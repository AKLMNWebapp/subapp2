using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mvc.DTOs
{
    public class ReviewDto
    {
        public int ReviewId { get; set; }
        [ForeignKey("User")]
        public string UserId {get; set; } = string.Empty;
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        [StringLength(500)]
        public string? Comment { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
    }
}