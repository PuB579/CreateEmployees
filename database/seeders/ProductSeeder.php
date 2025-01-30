<?php

namespace Database\Seeders;

use App\Models\Product; use App\Models\ProductType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents; use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
    * Run the database seeds.
    */
    public function run(): void
    {
        // สร้างประเภทสินค้า 5 รายการ
        $productTypes = ProductType::factory(5)->create();

        // สําหรับแต่ละประเภทสินค้า ให้สร้างสินค้าสุ่ม 100 รายการ
        Product::factory(100)->create();
    }
}
