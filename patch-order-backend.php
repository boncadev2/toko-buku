<?php
$fileController = 'backend/app/Http/Controllers/Api/OrderController.php';
$contentController = file_get_contents($fileController);
$contentController = str_replace(
  "'address.postal_code'=>['required','string','max:15']",
  "'address.postal_code'=>['required','string','max:15'], 'shipping_cost'=>['nullable','numeric'], 'shipping_method'=>['nullable','string']",
  $contentController
);
$contentController = str_replace(
  "\$o=\$this->orders->create(\$u,\$t,\$d['address'],\$d['item_ids']);",
  "\$o=\$this->orders->create(\$u,\$t,\$d['address'],\$d['item_ids'], \$d['shipping_cost'] ?? 0);",
  $contentController
);
file_put_contents($fileController, $contentController);

$fileService = 'backend/app/Services/Order/OrderService.php';
$contentService = file_get_contents($fileService);
$contentService = str_replace(
  "public function create(?User \$user, ?string \$token, array \$address, array \$itemIds): Order {",
  "public function create(?User \$user, ?string \$token, array \$address, array \$itemIds, float \$shippingCost = 0): Order {",
  $contentService
);
$contentService = str_replace(
  "use(\$user,\$token,\$address,\$itemIds)",
  "use(\$user,\$token,\$address,\$itemIds,\$shippingCost)",
  $contentService
);
$contentService = str_replace(
  "['number'=>'TB-'.now()->format('Ymd').'-'.strtoupper(Str::random(6)),'user_id'=>\$user?->id,'guest_token'=>\$user?null:\$token,'status'=>'pending_payment','subtotal'=>0,'grand_total'=>0],\$address",
  "['number'=>'TB-'.now()->format('Ymd').'-'.strtoupper(Str::random(6)),'user_id'=>\$user?->id,'guest_token'=>\$user?null:\$token,'status'=>'pending_payment','subtotal'=>0,'shipping_total'=>\$shippingCost,'grand_total'=>0],\$address",
  $contentService
);
$contentService = str_replace(
  "\$order->update(['subtotal'=>\$total + \$totalDiscount, 'discount_total'=>\$totalDiscount, 'grand_total'=>\$total]);",
  "\$order->update(['subtotal'=>\$total + \$totalDiscount, 'discount_total'=>\$totalDiscount, 'grand_total'=>\$total + \$shippingCost]);",
  $contentService
);
file_put_contents($fileService, $contentService);
