"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const LocationsMap: React.FC = () => {
  const [hoveredLocation, setHoveredLocation] = useState<"domkal" | "kolkata" | null>(null);

  // Precise geographic projection coordinates for Domkal & Kolkata in West Bengal
  const domkal = { x: 295.3, y: 318.2 };
  const kolkata = { x: 277.8, y: 463.6 };

  // Authentic West Bengal geographic boundary vector path (Official Survey & Cartographic projection)
  const westBengalPath =
    "M 255.6 39.1 L 258.3 40.2 L 260.9 38 L 263.8 38 L 265.5 39.4 L 272.2 38.6 L 274 40.8 L 275.6 40.3 L 284.1 43 L 293.2 36.6 L 292.4 34 L 299 32.5 L 305.3 35.5 L 308.3 33.9 L 311.4 37.7 L 313.9 36.8 L 324.9 40.4 L 325.4 55.1 L 329.6 51 L 332.7 53.4 L 332.9 54.9 L 331.5 56 L 333.6 57.7 L 335.7 58 L 339.5 56.2 L 341.4 59.6 L 346 61.1 L 345.3 62.6 L 346.8 63.7 L 346.6 65.9 L 349.3 68.5 L 353.2 67.3 L 354.8 68.5 L 360.9 67.7 L 366.6 64.3 L 367.7 65.5 L 371.8 63 L 373.6 65.5 L 378.9 66 L 379.9 68.7 L 389.2 67.8 L 395.1 71.4 L 396.8 70.8 L 398.1 72.7 L 394.3 76 L 396.1 76.8 L 398.5 76.9 L 399.9 74.8 L 404.8 76.5 L 407.7 75.2 L 407.5 76.8 L 409.5 78.7 L 412.4 77.2 L 417 78.3 L 418.8 83.3 L 417 85.7 L 418.9 86.7 L 416.7 95.7 L 418.2 102.1 L 414.3 106.9 L 415.5 107.4 L 416.1 106.3 L 416.9 108.3 L 414.1 108.5 L 413.6 111.2 L 412.8 110.5 L 413.6 109.3 L 410 110.9 L 409.9 113 L 407.1 113.9 L 407.9 116.9 L 403.9 115.7 L 405.9 118.6 L 404.7 119.8 L 402.8 118.7 L 402.5 119.7 L 405.1 121.7 L 402.1 123.6 L 405.4 124.1 L 403.5 124.9 L 403.9 126.1 L 401.9 126.3 L 403 127.8 L 405.5 127.8 L 403.2 129.7 L 401.2 129.1 L 402.9 127.9 L 400.2 125.1 L 401.8 124.3 L 400.6 123.6 L 401.4 122.6 L 400.6 121.9 L 399 123.6 L 396.6 122.7 L 398 126.2 L 395.8 126.5 L 398.7 127.5 L 397.3 128.6 L 394.9 127.3 L 394.3 129.6 L 392.8 129 L 393.6 132.8 L 396.1 132.5 L 392.8 134.5 L 394.3 135.7 L 396.1 133.9 L 398 138 L 395.1 139 L 394 137.8 L 394.6 139 L 391.3 141.6 L 392.2 146.2 L 391.1 145.7 L 390.9 147 L 390.2 145.9 L 388.8 147.2 L 387.5 145.3 L 388.6 143.8 L 380.1 143.9 L 377.6 142.8 L 377.2 139.6 L 374.1 142 L 374.3 143.3 L 370.1 143 L 367.7 140.4 L 363.5 139.3 L 363.7 137.8 L 361.5 137.9 L 362.5 135.4 L 358.6 132.5 L 352.2 131 L 352.1 128.7 L 350.2 127.1 L 351.6 124.4 L 350.8 121.9 L 347.2 117.6 L 347.6 114.3 L 349.3 117 L 350.6 114 L 346.9 113.1 L 345.6 113.9 L 347.1 112.4 L 346.7 110.1 L 345.2 109.7 L 346.6 107.4 L 345.8 106.7 L 340.9 106.8 L 339.8 105.1 L 336.7 104.4 L 336.2 101.9 L 333.8 100.7 L 332.6 103.9 L 330.9 103.2 L 331.1 105.3 L 328.8 105.5 L 330.2 106.5 L 329.6 109.4 L 333.9 109.9 L 332.8 111.1 L 333.7 112.9 L 334.2 110.8 L 336.3 111 L 336.4 112.5 L 337.8 113 L 336.3 115.5 L 339.3 116.6 L 340.1 115.2 L 340.2 117.3 L 343.2 116.5 L 343.6 120.1 L 342.3 121.2 L 334.3 121.4 L 331 117 L 327.5 116.6 L 324.8 118 L 326.4 121.6 L 323 122.1 L 320.2 119.7 L 319.9 115.4 L 318.1 114.7 L 314.9 115.9 L 313.7 111 L 309.5 112.7 L 307.4 108.4 L 309.4 107.7 L 306.6 106.9 L 307.9 105.6 L 305.8 105.7 L 302.1 103.3 L 302 100.2 L 299.3 99.9 L 299.5 102 L 295.8 101.3 L 296.1 98.3 L 292.9 99 L 292.7 96.5 L 289.8 95.9 L 289.2 93.4 L 286.9 92.9 L 285.8 93.9 L 284.4 92.9 L 282.6 84.7 L 280.2 86.7 L 281.1 87.7 L 279 88.5 L 275.1 99.4 L 277 102.3 L 278.1 98.5 L 281.5 98.6 L 283.2 100.5 L 289 100.9 L 290.1 105.8 L 291.5 106 L 292.8 110.3 L 291.3 111.4 L 291.3 110.3 L 289.5 110.3 L 289.2 111.3 L 286.5 109 L 284.7 112.5 L 281.7 113.2 L 282.6 114.4 L 280.1 114.6 L 276.6 117.6 L 277.5 121.5 L 276.7 123.4 L 269.6 126.5 L 267.1 126.2 L 260.6 130.3 L 258.8 136.6 L 261.2 137.5 L 259.9 139.6 L 261.3 141.7 L 257.2 142.8 L 254.4 149.9 L 251.9 152 L 252.4 153.8 L 253.9 154.2 L 254.6 157.9 L 253.4 158.8 L 254.7 162.9 L 257 163.1 L 258.2 165 L 261 162.7 L 263.3 163.9 L 266.1 161.9 L 269 161.8 L 269.2 164.4 L 274.2 168.6 L 279.1 170.7 L 278.8 172.4 L 281.7 173.5 L 281.8 174.7 L 286.4 175.6 L 285.5 181.6 L 290.5 183 L 290.1 185.2 L 292.6 187.5 L 293.6 186.8 L 294.7 190 L 295.4 188.9 L 299.4 190.2 L 300.7 189.3 L 302.1 191 L 304.3 191 L 304.4 192.7 L 309.1 193.3 L 310.1 190.8 L 312.7 190.3 L 313.3 191.9 L 315.6 191.3 L 315.2 188.5 L 316.8 189.4 L 319.4 188.7 L 319.8 191.7 L 322.1 193.4 L 322.4 194.9 L 321.1 196.1 L 321.9 197.5 L 320 199.1 L 322.6 200.6 L 322.5 203.4 L 326.7 207.1 L 328.4 205.9 L 330.2 208.9 L 338.2 209.7 L 337.8 211.5 L 335.7 211.1 L 333 213 L 333.3 216.7 L 331 216.8 L 332.3 219.8 L 330.5 219.9 L 329.9 221.6 L 327.4 219.9 L 325.6 220.3 L 322.6 217.5 L 319 221.1 L 315.9 219.4 L 314 220.6 L 310 217.6 L 301.1 218 L 296.9 220.6 L 295.9 220.5 L 296 219.1 L 293.8 219.4 L 294 218.5 L 290.4 217.4 L 285.2 219 L 287 223.1 L 285.1 225.4 L 286.1 229.8 L 284.5 232.5 L 286.1 233.9 L 282.4 237.8 L 282.7 239.6 L 280.9 240 L 281.3 242.3 L 279.7 243 L 277.7 241.7 L 275.7 242.9 L 274.2 245.2 L 276.3 247.2 L 274.1 249.7 L 273.9 248.2 L 272.2 249.3 L 269.7 246.9 L 268.4 248.8 L 268.4 244.8 L 265.1 241 L 256.8 243.1 L 256.9 244.9 L 259.7 247.4 L 258.2 248 L 258.9 249.5 L 260.2 250.2 L 257.4 251.4 L 256.5 255.4 L 255.2 253.8 L 253.7 257.8 L 250.4 258.7 L 249.7 263.5 L 244.8 268.3 L 257.6 283.3 L 263 287.8 L 269.5 289.5 L 275.3 295 L 280.4 295.8 L 284.6 294.9 L 293.1 298.4 L 295.6 302.8 L 297.3 299.9 L 302.4 301.9 L 308.1 301.2 L 311.6 303.2 L 312.6 305.5 L 312.1 312.1 L 310.7 311.8 L 309.1 315 L 310.1 319.4 L 308.6 319.9 L 309.1 321.6 L 311.5 321.5 L 311.2 324.4 L 312.6 324.8 L 311.3 325.6 L 312.8 327.2 L 311.6 331 L 314.6 329.7 L 315.8 331.6 L 312.3 332.6 L 313.1 336.5 L 312.1 338.6 L 309.3 338.6 L 309.6 339.8 L 305.2 342.8 L 302.5 343.4 L 301.3 342.1 L 297.5 343.6 L 299.9 347.6 L 298.5 348 L 299.1 349.1 L 298 350.2 L 296 350.5 L 297.8 352.4 L 296.2 363.9 L 299.1 364.4 L 298 367.7 L 304 367 L 303.4 368.4 L 305.5 372.5 L 309 375.7 L 311.7 376.3 L 313.1 378.9 L 318.3 377.6 L 317.6 382.6 L 315.1 382.5 L 314 386.9 L 314.9 390 L 312.2 391.4 L 313.4 394.9 L 311.6 394.2 L 311.5 395.7 L 310 395 L 308.8 396.4 L 311.3 398.6 L 311.1 400.3 L 315.5 401.4 L 318.5 403.7 L 319.8 403.6 L 319.2 400.5 L 320.1 400.3 L 321.3 400.9 L 320.5 402.1 L 321.8 401.5 L 323.2 402.8 L 329 402.3 L 329.4 404.3 L 332.6 404.9 L 335.2 403 L 336.6 403.9 L 335.4 406.9 L 333.5 406 L 331.2 408.1 L 329.8 411.9 L 324.9 414.9 L 325.3 423.4 L 322.8 423.4 L 324.8 424.7 L 324.2 427.9 L 327.3 428.3 L 327.5 430.6 L 329.1 431.3 L 328.1 432.7 L 328.6 435.2 L 330.8 436.1 L 332.1 435.2 L 334.1 438.4 L 333.2 443 L 329.6 446 L 329.7 448.6 L 333.2 453.1 L 330.7 456.8 L 328.5 453.7 L 324.4 455 L 324.4 452.2 L 323 452.4 L 322.9 450.9 L 319.3 450.7 L 319.2 447 L 322.1 448.5 L 323 447 L 321.5 446.7 L 322.8 447 L 322.1 448.4 L 319.3 446.7 L 319 448.4 L 319.3 450.9 L 324.2 452.3 L 324.3 455.1 L 328.5 453.9 L 330.8 459.4 L 333.2 460 L 331.1 461.8 L 331.3 463.9 L 327.3 464.5 L 322.4 469.7 L 324.5 471.5 L 323.2 472.7 L 323.4 476.7 L 320.7 476.4 L 319.6 472.2 L 315.8 469.2 L 317 468.1 L 315.2 467.2 L 315.3 464.7 L 315.1 467.8 L 316.8 468.1 L 315.6 469.1 L 312.2 469.4 L 309.3 467.5 L 308.3 468.2 L 306.6 465.7 L 307 461.7 L 306.5 465.8 L 308.1 468.2 L 316.3 469.7 L 318.8 475.9 L 323 477 L 323.7 479.2 L 322.7 480.8 L 325.6 483.9 L 320.2 483.1 L 318.7 486.2 L 318.9 490.7 L 313.2 495.7 L 313.4 498.3 L 312.8 497 L 312.2 498.8 L 303 496.9 L 307.7 489.7 L 307.1 486.9 L 308.2 486.5 L 306.6 486.7 L 305.9 485.4 L 307.2 489.6 L 302.7 497 L 306.6 498.2 L 303.3 504 L 302.6 503.5 L 301.6 506.9 L 299.7 505 L 300.2 502.1 L 298.3 501.4 L 297.7 498.5 L 297.2 499.4 L 300.1 502.1 L 299.5 504.8 L 301.7 507.3 L 303.2 512.7 L 301.4 515.1 L 300.1 514.9 L 299.4 510.8 L 299.7 514.7 L 301.1 515.2 L 299.6 519.9 L 301.2 522.9 L 299.9 523 L 300.6 524.9 L 297.8 527.4 L 297.2 525.8 L 298.5 523.7 L 297.2 525.7 L 295.1 524.4 L 294.4 520 L 295.8 519.6 L 296.8 520.9 L 294.7 519.5 L 295 524.4 L 297 526.1 L 294.2 526 L 294.9 528.2 L 293.2 530.7 L 289.9 528.4 L 292.8 524 L 289.9 519.9 L 292.2 518.1 L 294.6 518.6 L 295.6 513.7 L 294.4 518.7 L 292.3 518 L 289.6 520.3 L 292.4 522.5 L 292.5 524.8 L 289.1 525.3 L 288.1 526.8 L 286.3 526.4 L 286.1 522.4 L 287.7 520.8 L 285.4 520.3 L 285.2 517.8 L 286.8 516 L 285 517.8 L 285.3 520.3 L 287.6 521 L 285.9 522.4 L 286.6 524.6 L 283 525.7 L 281.9 527.8 L 279.7 526.6 L 281.8 524.8 L 281.1 521.6 L 278.7 520.4 L 280.6 519.7 L 278.7 519.9 L 281 521.5 L 280.4 522.9 L 281.7 524.3 L 279.5 526.1 L 280.9 527.7 L 280.3 535.8 L 277.7 535.9 L 276.9 533.6 L 278.4 526.8 L 277 524 L 278.2 527.1 L 276.8 530.4 L 272.7 530.5 L 272.7 528.4 L 271.9 530 L 268.1 530.2 L 268.6 527.9 L 268 530.3 L 271.7 530.1 L 273.1 531.2 L 272.3 532.9 L 268 534.8 L 270.2 539.3 L 267.3 535.5 L 267.5 537.3 L 270.2 539.6 L 269.2 542.2 L 268.4 541.8 L 269.3 539.8 L 264.1 539.1 L 262.6 533.9 L 259 528.3 L 260.3 523.6 L 258.1 520.8 L 263.3 514.8 L 264.7 510.1 L 262.8 501.5 L 259.3 498.5 L 250.3 497.3 L 253.6 488.6 L 251.9 489.1 L 250.8 493.6 L 248.4 496.5 L 242.4 494.2 L 239.9 490.4 L 238.9 479.3 L 236.7 476.5 L 233 475.8 L 237.3 479.4 L 238.5 483 L 238.8 486.4 L 237.9 487.5 L 237.4 485.9 L 238.2 492.8 L 244.6 498.3 L 247 497.5 L 250.6 499.6 L 256.5 499.8 L 261.7 507.3 L 258.7 510.8 L 249.6 515.8 L 243 507.4 L 240.3 507.4 L 244.8 510.4 L 245.4 513.2 L 248.8 516.1 L 241.9 530.5 L 237.2 535.7 L 233.5 536.3 L 233.8 537.6 L 224.5 545.4 L 220.8 545 L 220.2 546.6 L 215.8 548.7 L 211.7 549.8 L 210.5 548.8 L 209.1 550.1 L 202.1 551 L 195.5 553.5 L 195.5 551.9 L 193.3 550.2 L 194.4 544.4 L 193.9 542.6 L 191.8 542.3 L 191.9 539.3 L 186.3 538.4 L 185.1 539.4 L 183.4 537 L 181.9 537.6 L 175 534.4 L 172.4 526.8 L 174.1 524.7 L 172.4 521.3 L 168.7 521.4 L 166.1 519.5 L 165.1 523.7 L 159.3 525.6 L 159.4 530.1 L 153.3 529.6 L 150.3 525.7 L 153.7 518 L 152.2 513.2 L 150.1 512.8 L 146.5 509.3 L 134.9 508.2 L 131.6 505.3 L 131 502.7 L 124 503.7 L 124.7 497 L 128.8 497.3 L 130 495.4 L 131.1 496.2 L 129.6 497.1 L 131.9 497.1 L 132.8 494.8 L 131.2 494.8 L 131 492.5 L 131.9 492.6 L 131.8 494.6 L 133 492.4 L 133.4 493.8 L 133.8 492.7 L 139.9 493.5 L 139.9 489.6 L 134.6 486.8 L 136 480.1 L 128.3 477.4 L 126.8 472.7 L 130.9 472.8 L 131.7 470.5 L 128.1 463.6 L 118 463.3 L 116.4 461.3 L 116.6 455.9 L 114.9 454.2 L 107.5 449.8 L 104.8 450.2 L 104.5 451.6 L 99.6 446.2 L 96.1 444.6 L 97.6 436.8 L 98.9 436.9 L 98.9 434.6 L 100.4 433.4 L 97.6 430.9 L 101.1 428.5 L 102.4 429.9 L 103.6 428.6 L 105.6 428.9 L 107.5 427.3 L 107.6 424.9 L 105 426.9 L 103.9 426.7 L 103.6 424.7 L 96.1 424.2 L 93.9 426.2 L 91.7 424.3 L 86.4 424.2 L 85.1 422.5 L 81.6 424.2 L 76.5 424.3 L 76.3 422.5 L 73.9 422.7 L 71.2 419.9 L 70 416 L 61.7 413.6 L 61.8 411.7 L 60.3 410.2 L 49.3 411.7 L 45.8 409 L 44 405.6 L 41.6 405.8 L 41 399.2 L 45.9 393.6 L 44.8 389.7 L 47.5 389.2 L 45.9 385.7 L 44.5 385.5 L 44.7 379.9 L 47.1 379.4 L 52.6 381.3 L 61.6 377.7 L 58.2 372.3 L 60.7 369.3 L 64 370.7 L 71.1 371 L 70.8 379.6 L 73.3 379.1 L 77.9 381.2 L 79.5 379.9 L 78.2 382.4 L 78.8 383.7 L 80.2 384.7 L 80.8 382.9 L 83.2 382.6 L 85.2 384.6 L 86.6 383.8 L 85.2 382.4 L 89 381.6 L 90.4 378.8 L 91.9 378.7 L 90.2 377.4 L 91.5 375.4 L 90.6 373.1 L 92.8 369.2 L 98.3 366.9 L 98.3 365 L 106.6 365.1 L 112.4 361.1 L 123.6 358.7 L 125.5 359 L 126.1 360.5 L 131.1 359.6 L 132.3 354.7 L 133.7 353.6 L 131.2 346.2 L 133.8 348.1 L 138.5 345 L 139.5 347.8 L 138.9 343.3 L 141.8 341.7 L 144.6 344.9 L 147.4 343 L 162.1 349.6 L 164.4 349.7 L 166.1 347.3 L 162.7 344.4 L 162.7 342.9 L 168.8 344.1 L 168.4 345.4 L 172.6 344.2 L 170.9 346.3 L 173.2 346.7 L 174.3 345.5 L 173.7 339.1 L 175.8 342.3 L 178 339.9 L 177.7 334.6 L 174.7 333.3 L 175.5 331.9 L 174.9 330.2 L 173.2 330.4 L 172.7 326.6 L 176.9 328 L 181.5 327.6 L 179.9 330.1 L 180.7 330.7 L 183 330.9 L 183.8 329.6 L 193.2 332.2 L 191.2 329.4 L 195.6 329.2 L 198.2 326.8 L 196.3 325.6 L 196.2 323.6 L 197.7 323.1 L 196.1 322.2 L 196.6 319.7 L 200.8 322.3 L 204.3 322.5 L 203.6 320.5 L 207.2 318.4 L 203.6 316 L 204.6 315.4 L 214.9 316.5 L 215.1 313.1 L 210 310.7 L 209.8 307.8 L 210.9 307.3 L 211.8 308.5 L 214.1 307.5 L 216.1 306.2 L 216.8 303.2 L 218.4 303.8 L 221.1 302.1 L 221.5 299.4 L 224.9 294.8 L 224.7 293.1 L 226.1 292.5 L 225.6 291.5 L 223.7 291.8 L 224.3 289.6 L 226.7 288 L 226 286 L 227.3 284.3 L 226.1 284.6 L 225.8 282.8 L 224.7 284.7 L 225.6 279.2 L 222.1 277.2 L 222.3 276.2 L 226 276.7 L 229.7 279.1 L 233.3 278 L 235.4 275.1 L 235.2 273.7 L 231.9 273.5 L 234.6 273.3 L 234.7 272.1 L 233 272 L 235.1 271.5 L 235.6 268.7 L 233.2 267.6 L 234.6 263.2 L 232.4 261.5 L 231.8 262.4 L 228.9 261.6 L 226.4 260.2 L 226.8 259 L 228.7 257 L 228.4 259.3 L 230.2 259.2 L 232.4 256 L 231.3 253.9 L 234.3 253.6 L 233.5 250.9 L 240.7 248.3 L 241.3 246.8 L 240.7 243.8 L 232.3 234.6 L 222.6 227.9 L 224 216.6 L 228.6 218.6 L 227.3 215.3 L 229.6 213.7 L 230.4 210.8 L 229.9 209.4 L 223.7 206.2 L 224.1 202.5 L 222 201.9 L 221.4 198.9 L 222.4 199 L 222 197.6 L 223.9 195.3 L 226 196.7 L 228.3 193.8 L 231.1 193.8 L 230.8 191.8 L 232.5 189.1 L 234.9 189.9 L 236.7 187.2 L 242.5 188.2 L 242.6 190.3 L 244.2 191.1 L 244.5 189.6 L 246.7 191.9 L 250.4 192.4 L 250.6 190.2 L 247.1 187.1 L 246.3 185.6 L 247.4 184.6 L 245.8 182.4 L 247.4 181.7 L 247.1 179.6 L 248.9 178.2 L 247.1 177.8 L 248.3 177.1 L 248.6 173.2 L 247.5 172.1 L 245.3 172.7 L 245.4 171.4 L 242.7 169.7 L 240.2 169.6 L 237.5 165.2 L 234.3 165.4 L 234 162.1 L 235.5 161.2 L 232.9 159.9 L 235.5 157.7 L 227.3 155.9 L 226.7 152 L 225.5 151.3 L 227.9 149.9 L 227.6 145 L 229.1 139.8 L 232.2 138.7 L 235.7 135.4 L 237.4 137.5 L 238 136 L 240.8 136.3 L 239.6 134.3 L 241.5 132.6 L 239.8 131.9 L 241.1 131.1 L 240.5 129.7 L 242.1 129.1 L 245 130.8 L 247.3 127.3 L 250.3 127.5 L 254.2 122.8 L 256.8 122.4 L 256.9 120.6 L 263.8 117.6 L 267 113.4 L 269.6 112.9 L 271 110.9 L 268.8 108.3 L 266 108.9 L 265.3 107.2 L 268.8 104.6 L 266.5 102 L 265.2 102.2 L 263.9 100.5 L 264.9 99.5 L 261.9 99.9 L 260.5 98.1 L 265.6 94.2 L 265.4 92.4 L 263.9 91.9 L 263.8 93.9 L 259.5 93.8 L 257.4 96.2 L 253.6 93.9 L 254.6 90.5 L 256.2 90.4 L 257.3 85.6 L 259 84.5 L 261.5 74.9 L 259.7 65.8 L 260.3 63.7 L 256.8 60.1 L 257.7 58 L 255.3 55.3 L 256.6 51.9 L 252.3 49.9 L 251.2 47.3 L 247.6 47.2 L 246 42.5 L 242.9 39.5 L 245.9 34.7 L 245.1 31.6 L 246 30 L 250.8 31.9 L 250.1 32.9 L 251.6 37.1 L 255.6 39.1 Z M 332.4 499.4 L 333.5 499.4 L 335.7 503.2 L 335.1 504.7 L 334.4 502.5 L 332.7 502.3 L 335.8 504.7 L 334.1 509.4 L 332.5 507.3 L 334.1 509.6 L 330.1 510.9 L 330 514.9 L 330.6 516.9 L 332.1 517 L 331 511.8 L 333.7 511.7 L 335 513.5 L 333.6 515.3 L 334.5 518.2 L 336.2 519.8 L 338.4 519 L 336.2 521.5 L 339.1 524.3 L 338.4 526.2 L 334.1 524.3 L 334.9 522.1 L 333.6 523.1 L 334 524.2 L 331.3 523.2 L 329.2 518.5 L 327.9 510.9 L 330.7 507.8 L 329.9 505.6 L 331.5 505 L 331.2 503.7 L 330.6 505.5 L 328.6 504.6 L 327.2 501.1 L 329.7 502 L 332.4 499.4 Z M 323.1 483.2 L 326.9 484.9 L 328.8 488.5 L 331.2 489 L 330.6 493 L 332.4 494.1 L 332.8 496.1 L 327.3 495.8 L 326.7 492.3 L 322.5 490 L 326.6 492.3 L 326.4 495 L 329.1 496.9 L 328.2 498.8 L 329.6 501.6 L 327.6 500.4 L 325.2 501.1 L 324.6 498.9 L 326.4 498.2 L 326.2 497.2 L 322.2 497 L 325.5 493.5 L 322.1 497 L 326.2 497.3 L 326.2 498.3 L 323.4 497.8 L 322.5 499.3 L 321.8 497.6 L 320.2 498.7 L 319 497.5 L 318.5 495.9 L 321 494.7 L 321.2 492.9 L 319 490.4 L 318.8 486.3 L 320.2 483.5 L 323.1 483.2 Z M 335.7 481.4 L 335.5 486.6 L 339.3 489.3 L 336.8 489.3 L 336.5 490.4 L 338.7 491.9 L 338.3 493.5 L 340.2 493.1 L 340.5 495.9 L 343.3 498.4 L 343.4 503.2 L 346.1 502.5 L 342.9 505.1 L 339.2 501.5 L 339.1 498 L 334.5 497.5 L 332.2 493.3 L 332.8 483.4 L 334.7 480.3 L 334 479 L 336.1 480.5 L 335.7 481.4 Z M 329.6 464.3 L 333.3 465.7 L 335 472 L 336.7 473.5 L 336 475.8 L 337 477 L 333.7 478.9 L 333.2 483 L 331.4 481 L 331.4 478 L 330.9 480.1 L 332.8 482.9 L 331.8 488.1 L 328.4 485.7 L 327.4 481.7 L 330.6 480.6 L 328.5 478.2 L 329.7 477.2 L 327.3 473.6 L 329.1 469.5 L 327.3 464.8 L 329.6 464.3 Z M 256.6 528.7 L 259.9 534.6 L 259.8 540.8 L 258.3 546.4 L 257.2 546.9 L 258.3 546.8 L 258.3 549.6 L 257.1 551.3 L 253.8 551.9 L 247.7 549.8 L 247.2 547.4 L 250.6 537.5 L 256.6 528.7 Z M 338.6 512.3 L 340.8 512.4 L 344 516.6 L 342.7 523.4 L 341.1 523.3 L 340.9 521.6 L 341.7 523.6 L 339.9 523.9 L 337 521.7 L 338.8 519.3 L 337.6 518.3 L 340.1 516.8 L 336.4 519.5 L 334.8 517.8 L 337 516.4 L 334.7 517.7 L 334.1 515.5 L 335.7 511.9 L 337.9 512.3 L 338.6 511.2 L 338.6 512.3 Z M 308.7 497.6 L 315.2 499.1 L 317.4 501.2 L 307.5 509.5 L 308.4 511.9 L 312.5 514.1 L 312.8 515.5 L 311.3 516.5 L 305.7 514.8 L 304.8 509.7 L 303 507.4 L 304.7 501.8 L 308.7 497.6 Z M 337.3 498.5 L 338.4 498.8 L 339 503 L 341.8 504.7 L 340.5 506.7 L 338.6 506.4 L 339.9 505.6 L 338.5 506.3 L 340.4 506.8 L 340.7 512.1 L 339.7 512.1 L 339.1 509.7 L 339.5 512.1 L 338.5 511 L 337.9 512.1 L 335.7 511.7 L 334.9 513.3 L 333.6 511.3 L 335.3 509.6 L 336.8 503.9 L 334.5 499 L 337.3 498.5 Z M 322.6 499.4 L 323.5 497.9 L 324.4 498.5 L 324.8 501.2 L 322.5 501.3 L 323.7 503.6 L 316.1 506.8 L 312.8 511.7 L 309.5 511 L 309.4 509.6 L 312.5 507.2 L 313.7 504.4 L 319.2 500.3 L 322.1 501.4 L 321.1 497.6 L 322.6 499.4 Z M 264.4 539.2 L 269.2 539.9 L 268.2 542.2 L 272.8 547.2 L 270.7 552.2 L 270.7 554.6 L 272.4 555.9 L 271 557.8 L 267 557.7 L 266.5 554.7 L 264 552.9 L 265.8 550.9 L 265.6 548 L 263 547.4 L 262.3 546 L 264.4 545 L 263.5 542.9 L 264.4 539.2 Z M 321.4 538.9 L 324.5 539.4 L 322.1 543.7 L 324.1 550.8 L 322.7 551.9 L 322.5 550.2 L 321.1 549.6 L 322.4 550.3 L 322.7 552.5 L 319.3 550.9 L 320.6 548.3 L 319.8 544 L 314.9 544.9 L 316.8 543.5 L 317.6 540.4 L 321.4 538.9 Z";

  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-[440px] sm:max-w-[480px] aspect-[460/600] flex items-center justify-center">
        <svg
          viewBox="0 0 460 600"
          className="w-full h-full select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. Map Outline & Silhouette with Smooth Staggered Draw */}
          <motion.path
            d={westBengalPath}
            initial={{ pathLength: 0, opacity: 0, fillOpacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1, fillOpacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              pathLength: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.6 },
              fillOpacity: { delay: 0.5, duration: 0.8, ease: "easeOut" },
            }}
            fill="#E6EFE8"
            stroke="#07543F"
            strokeWidth="2"
            strokeOpacity="0.85"
            strokeLinejoin="round"
            className="transition-colors duration-300 hover:fill-[#DEEAE0]"
          />

          {/* Minimal Region Context Indicators */}
          <motion.text
            x="140"
            y="50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.75 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            fill="#07543F"
            fontSize="10"
            fontWeight="700"
            letterSpacing="1.5"
            className="uppercase select-none font-bold"
          >
            WEST BENGAL
          </motion.text>

          <motion.text
            x="210"
            y="585"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.75 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            fill="#07543F"
            fontSize="9.5"
            fontWeight="600"
            letterSpacing="1.2"
            className="select-none font-semibold uppercase tracking-wider"
          >
            Bay of Bengal
          </motion.text>

          {/* 1.5 Clean Route Connection between Kolkata & Domkal (Clean, Borderless) */}
          <g className="pointer-events-none">
            {/* Subtle Base Dashed Route Line */}
            <motion.path
              d="M 277.8 463.6 C 274 446, 273 432, 282 414 C 287.5 398, 273 384, 268.5 363 C 265 347, 279 337, 287.8 327 L 295.3 318.2"
              fill="none"
              stroke="#07543F"
              strokeWidth="1.6"
              strokeDasharray="4 4"
              strokeLinecap="round"
              strokeOpacity="0.45"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
            />

            {/* Glowing Smooth Pulse traveling between the hubs */}
            <motion.path
              d="M 277.8 463.6 C 274 446, 273 432, 282 414 C 287.5 398, 273 384, 268.5 363 C 265 347, 279 337, 287.8 327 L 295.3 318.2"
              fill="none"
              stroke="#07543F"
              strokeWidth="2.5"
              strokeDasharray="8 60"
              strokeLinecap="round"
              animate={{
                strokeDashoffset: [0, -136],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>

          {/* 2. Domkal Location Pin, Ripple Waves & Label (Clickable to Google Maps) */}
          <a
            href="https://maps.app.goo.gl/tEAEmQEPYrsJvfjN7"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Domkal Registered Office in Google Maps"
            className="cursor-pointer group/domkal"
            onMouseEnter={() => setHoveredLocation("domkal")}
            onMouseLeave={() => setHoveredLocation(null)}
          >
            {/* Primary Radar Ripple Ring */}
            <motion.circle
              cx={domkal.x}
              cy={domkal.y}
              r="14"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 2.2, 2.2], opacity: [0.7, 0, 0] }}
              transition={{
                delay: 0.8,
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
              fill="#07543F"
            />

            {/* Secondary Inner Radar Ring */}
            <motion.circle
              cx={domkal.x}
              cy={domkal.y}
              r="10"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.8, 1.8], opacity: [0.5, 0, 0] }}
              transition={{
                delay: 1.4,
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
              fill="#07543F"
            />

            {/* Pin Core Dot with Spring Entrance & Hover Scale */}
            <motion.circle
              cx={domkal.x}
              cy={domkal.y}
              r={hoveredLocation === "domkal" ? 6.5 : 5}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, type: "spring", stiffness: 300, damping: 15 }}
              fill="#07543F"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              className="transition-all duration-200"
            />

            {/* Domkal Label Card Overlay - Snug & Clean Link */}
            <motion.foreignObject
              x={domkal.x + 10}
              y={domkal.y - 20}
              width="130"
              height="44"
              initial={{ opacity: 0, x: -6, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.85, type: "spring", stiffness: 240, damping: 18 }}
            >
              <div
                className={`inline-flex flex-col w-max bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-lg border shadow-xs transition-all duration-200 cursor-pointer ${hoveredLocation === "domkal"
                    ? "border-buraq-primary/60 shadow-md scale-105 bg-[#F0F8F4]"
                    : "border-black/10 hover:border-buraq-primary/40 hover:scale-105"
                  }`}
              >
                <span className="text-[10.5px] font-black text-buraq-dark tracking-tight leading-tight group-hover/domkal:text-buraq-primary transition-colors">
                  Domkal
                </span>
                <span className="text-[8.5px] font-semibold text-buraq-primary leading-tight whitespace-nowrap">
                  Registered HQ ↗
                </span>
              </div>
            </motion.foreignObject>
          </a>

          {/* 7. Kolkata Location Pin, Ripple Waves & Label (Clickable to Google Maps) */}
          <a
            href="https://maps.app.goo.gl/TvcqaEw6sUdEQc7U6"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Kolkata Office in Google Maps"
            className="cursor-pointer group/kolkata"
            onMouseEnter={() => setHoveredLocation("kolkata")}
            onMouseLeave={() => setHoveredLocation(null)}
          >
            {/* Primary Radar Ripple Ring */}
            <motion.circle
              cx={kolkata.x}
              cy={kolkata.y}
              r="14"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 2.2, 2.2], opacity: [0.7, 0, 0] }}
              transition={{
                delay: 1.1,
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
              fill="#07543F"
            />

            {/* Secondary Inner Radar Ring */}
            <motion.circle
              cx={kolkata.x}
              cy={kolkata.y}
              r="10"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [1, 1.8, 1.8], opacity: [0.5, 0, 0] }}
              transition={{
                delay: 1.7,
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
              fill="#07543F"
            />

            {/* Pin Core Dot with Spring Entrance & Hover Scale */}
            <motion.circle
              cx={kolkata.x}
              cy={kolkata.y}
              r={hoveredLocation === "kolkata" ? 6.5 : 5}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75, type: "spring", stiffness: 300, damping: 15 }}
              fill="#07543F"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              className="transition-all duration-200"
            />

            {/* Kolkata Label Card Overlay - Snug & Clean Link */}
            <motion.foreignObject
              x={kolkata.x - 122}
              y={kolkata.y - 12}
              width="114"
              height="44"
              initial={{ opacity: 0, x: 6, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.95, type: "spring", stiffness: 240, damping: 18 }}
            >
              <div className="flex justify-end w-full">
                <div
                  className={`inline-flex flex-col items-end w-max bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-lg border shadow-xs text-right transition-all duration-200 cursor-pointer ${hoveredLocation === "kolkata"
                      ? "border-buraq-primary/60 shadow-md scale-105 bg-[#F0F8F4]"
                      : "border-black/10 hover:border-buraq-primary/40 hover:scale-105"
                    }`}
                >
                  <span className="text-[10.5px] font-black text-buraq-dark tracking-tight leading-tight group-hover/kolkata:text-buraq-primary transition-colors">
                    Kolkata
                  </span>
                  <span className="text-[8.5px] font-semibold text-buraq-primary leading-tight whitespace-nowrap">
                    Operations Hub ↗
                  </span>
                </div>
              </div>
            </motion.foreignObject>
          </a>
        </svg>
      </div>
    </div>
  );
};
