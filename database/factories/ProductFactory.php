<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the model associated with the factory.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // ตัวเลข 13 หลัก
            'product_code' => $this->faker->numerify(str_repeat('#', 13)),

            // ชื่อสินค้าแบบสุ่ม
            'name' => $this->faker->words(3, true),

            // ราคาสินค้า
            'amount' => $this->faker->randomFloat(2, 10, 1000),

            // คะแนนโหวต
            'votes' => $this->faker->numberBetween(0, 1000),

            // สถานะยืนยัน
            'confirmed' => $this->faker->boolean(),

            // วันที่สร้าง
            'created_at' => $this->faker->date(),

            // สามารถเพิ่มรูปภาพได้ภายหลัง
            'photo_path' => null,

            // ประเภทสินค้า (อ้างอิง ProductType)
            'product_type' => $this->faker->numberBetween(1, 5),
        ];
    }
}
