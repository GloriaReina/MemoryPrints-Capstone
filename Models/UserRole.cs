﻿using System.ComponentModel.DataAnnotations;

namespace MemoryPrints.Models
{
    public class UserRole
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
